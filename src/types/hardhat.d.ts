import "hardhat/types/config";

declare module "hardhat/types/config" {
  interface TypechainConfig {
    outDir?: string;
    target?: string;
    alwaysGenerateOverloads?: boolean;
    discriminateTypes?: boolean;
    dontOverrideCompile?: boolean;
    externalArtifacts?: string[];
  }

  interface HardhatUserConfig {
    typechain?: TypechainConfig;
  }

  interface HardhatConfig {
    typechain: TypechainConfig;
  }
}
