import { ethers } from "ethers";
import type { MetaMaskInpageProvider } from "@metamask/providers";

// ✅ Smart contract address — bạn cần thay bằng địa chỉ thực tế của bạn
const CONTRACT_ADDRESS = "0xCc2905B03582f15589FDB7ed0311C29412f64BAa";

// ✅ ABI của smart contract
const CONTRACT_ABI = [
  {
    inputs: [{ internalType: "uint256", name: "_productId", type: "uint256" }],
    name: "purchaseProduct",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
];

// 🟡 BNB Testnet (Chain ID = 97, hex: 0x61)
const BNB_TESTNET_PARAMS = {
  chainId: "0x61",
  chainName: "BNB Smart Chain Testnet",
  nativeCurrency: {
    name: "BNB",
    symbol: "tBNB",
    decimals: 18,
  },
  rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545"],
  blockExplorerUrls: ["https://testnet.bscscan.com"],
};

export const isMetaMaskAvailable = (): boolean => {
  return typeof window !== "undefined" && typeof window.ethereum !== "undefined";
};

export const connectMetaMask = async (): Promise<string> => {
  if (!isMetaMaskAvailable()) {
    throw new Error("❌ MetaMask không khả dụng. Vui lòng cài đặt MetaMask.");
  }

  const ethereum = window.ethereum as MetaMaskInpageProvider;

  const accounts = (await ethereum.request({
    method: "eth_requestAccounts",
  })) as string[];

  if (!accounts || accounts.length === 0) {
    throw new Error("⚠️ Không có tài khoản MetaMask nào được cấp quyền.");
  }

  return accounts[0];
};

// ✅ Switch MetaMask sang BNB Testnet
export const switchToBNBTestnet = async () => {
  const ethereum = window.ethereum as MetaMaskInpageProvider;

  try {
    await ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: BNB_TESTNET_PARAMS.chainId }],
    });
  } catch (switchError) {
  if (
    typeof switchError === "object" &&
    switchError !== null &&
    "code" in switchError
  ) {
    const errorWithCode = switchError as { code: number };

    if (errorWithCode.code === 4902) {
      // Nếu chưa có chain thì thêm
      await ethereum.request({
        method: "wallet_addEthereumChain",
        params: [BNB_TESTNET_PARAMS],
      });
    } else {
      throw new Error("❌ Không thể chuyển mạng lưới MetaMask.");
    }
  } else {
    throw new Error("❌ Lỗi không xác định khi chuyển chain.");
  }}
};

// ✅ Thực hiện giao dịch mua hàng
export const purchaseProduct = async (
  productId: number,
  amountInEth: string
) => {
  if (!isMetaMaskAvailable()) {
    throw new Error("❌ MetaMask không khả dụng.");
  }

  const ethereum = window.ethereum as MetaMaskInpageProvider;

  await ethereum.request({ method: "eth_requestAccounts" });

  const provider = new ethers.BrowserProvider(ethereum);
  const signer = await provider.getSigner();
  const userAddress = await signer.getAddress();

  const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

  try {
    console.log("🚀 Gửi transaction từ ví:", userAddress);
    const tx = await contract.purchaseProduct(productId, {
      value: ethers.parseEther(amountInEth),
    });

    console.log("📤 Transaction sent:", tx.hash);

    const receipt = await tx.wait();
    console.log("✅ Transaction mined:", receipt.transactionHash || receipt.hash);

    return receipt;
  } catch (error: unknown) {
    if (typeof error === "object" && error !== null && "code" in error) {
      const err = error as { code?: number; message?: string };

      if (err.code === 4001) {
        throw new Error("❌ Người dùng đã từ chối giao dịch.");
      } else if (err.code === -32603) {
        throw new Error("❌ Lỗi nội bộ EVM hoặc không đủ gas.");
      } else {
        throw new Error(`❌ Giao dịch thất bại: ${err.message || "Không rõ nguyên nhân"}`);
      }
    }

    throw new Error("❌ Lỗi không xác định khi giao dịch.");
  }
};
