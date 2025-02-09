import { Id } from '../serializable/fxs/common';

export const PrimaryNetworkID = new Id(new Uint8Array(32));
export const PlatformChainID = new Id(new Uint8Array(32));

export const MainnetName = 'mainnet';
export const CascadeName = 'cascade';
export const DenaliName = 'denali';
export const EverestName = 'everest';
export const FujiName = 'fuji';
export const TestnetName = 'testnet';
export const UnitTestName = 'testing';
export const LocalName = 'local';
export const FlareName = 'flare';
export const CostwoName = 'costwo';
export const LocalFlareName = 'localflare';
export const SongbirdName = 'songbird';
export const CostonName = 'coston';

export const MainnetID = 1;
export const CascadeID = 2;
export const DenaliID = 3;
export const EverestID = 4;
export const FujiID = 5;
export const LocalID = 12345;
export const FlareID = 14;
export const CostwoID = 114;
export const LocalFlareID = 162;
export const SongbirdID = 5;
export const CostonID = 7;
export const TestnetID = FujiID;
export const UnitTestID = 10;

export const MainnetHRP = 'avax';
export const CascadeHRP = 'cascade';
export const DenaliHRP = 'denali';
export const EverestHRP = 'everest';
export const FujiHRP = 'fuji';
export const UnitTestHRP = 'testing';
export const LocalHRP = 'local';
export const FallbackHRP = 'custom';
export const FlareHRP = 'flare';
export const CostwoHRP = 'costwo';
export const LocalFlareHRP = 'localflare';
export const SongbirdHRP = 'songbird';
export const CostonHRP = 'coston';

export const NetworkIDToHRP = {
  [MainnetID]: MainnetHRP,
  [CascadeID]: CascadeHRP,
  [DenaliID]: DenaliHRP,
  [EverestID]: EverestHRP,
  // [FujiID]: FujiHRP, FujiID == SongbirdID
  [UnitTestID]: UnitTestHRP,
  [LocalID]: LocalHRP,
  [FlareID]: FlareHRP,
  [CostwoID]: CostwoHRP,
  [LocalFlareID]: LocalFlareHRP,
  [SongbirdID]: SongbirdHRP,
  [CostonID]: CostonHRP,
};

/**
 * Returns the human readbale part for a bech32 string given the network ID.
 * @param networkID
 */
export const getHRP = (networkID: number): string => {
  return NetworkIDToHRP[networkID] ?? FallbackHRP;
};
