import type { SpendReducerFunction } from './types';
import { LocalID, LocalFlareID } from '../../../../constants/networkIDs';

// Local dev networks where a freshly-booted node reports feeState.capacity: 0
// (no P-chain blocks yet → time doesn't advance → capacity never refills).
// Upstream only recognizes LocalID (12345); Flare's local network is LocalFlareID (162).
const LOCAL_DEVNET_IDS = new Set<number>([LocalID, LocalFlareID]);

/**
 * Verify that gas usage is within limits.
 *
 * Calls the spendHelper's verifyGasUsage method.
 */
export const verifyGasUsage: SpendReducerFunction = (
  state,
  spendHelper,
  context,
) => {
  const verifyError = spendHelper.verifyGasUsage(
    LOCAL_DEVNET_IDS.has(context.networkID),
  );

  if (verifyError) {
    throw verifyError;
  }

  return state;
};
