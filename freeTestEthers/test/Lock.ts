import { time, loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";
import { Lock } from "../../typechain-types";

describe("Lock", function () {
  async function deployOneYearLockFixture() {
    const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
    const ONE_GWEI = 1_000_000_000;
    const lockedAmount = ONE_GWEI;
    const unlockTime = (await time.latest()) + ONE_YEAR_IN_SECS;

    const [owner, otherAccount] = await ethers.getSigners();

    const LockFactory = await ethers.getContractFactory("Lock");
    const lock = (await LockFactory.deploy(unlockTime, {
      value: lockedAmount,
    })) as unknown as Lock;

    return { lock, unlockTime, lockedAmount, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("Should set the right unlockTime", async function () {
      const { lock, unlockTime } = await loadFixture(deployOneYearLockFixture);
      expect(await lock.unlockTime()).to.equal(unlockTime);
    });

    it("Should set the right owner", async function () {
      const { lock, owner } = await loadFixture(deployOneYearLockFixture);
      expect(await lock.owner()).to.equal(owner.address);
    });
  });

  describe("Withdrawals", function () {
    it("Should fail if called too soon", async function () {
      const { lock } = await loadFixture(deployOneYearLockFixture);
      await expect(lock.withdraw()).to.be.revertedWith("You can't withdraw yet");
    });

    it("Should fail if called from another account", async function () {
      const { lock, unlockTime, otherAccount } = await loadFixture(deployOneYearLockFixture);
      await time.increaseTo(unlockTime);
      await expect(lock.connect(otherAccount).withdraw()).to.be.revertedWith("You aren't the owner");
    });

    it("Should work for owner after time", async function () {
      const { lock, unlockTime } = await loadFixture(deployOneYearLockFixture);
      await time.increaseTo(unlockTime);
      await expect(lock.withdraw()).not.to.be.reverted;
    });

    it("Should emit event on withdraw", async function () {
      const { lock, unlockTime, lockedAmount } = await loadFixture(deployOneYearLockFixture);
      await time.increaseTo(unlockTime);
      await expect(lock.withdraw())
        .to.emit(lock, "Withdrawal")
        .withArgs(lockedAmount, anyValue);
    });
  });
});
