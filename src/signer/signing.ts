import type { UnsignedTx } from '../vms/common/unsignedTx';
import { sha256 } from '@noble/hashes/sha256';
import { keccak_256 } from '@noble/hashes/sha3';
import { bytesToHex } from '@noble/hashes/utils';

export enum SigningType {
  // Sign message bytes
  AVALANCHE,
  // Sign message after adding ETH prefix
  ETH,
}

export interface SigningData {
  publicKey: Uint8Array;
  signature: Uint8Array;
}

export interface EcdsaSignature {
  r: bigint;
  s: bigint;
  recoveryParam: number;
}

export function messageHashFromUnsignedTx(
  unsignedTx: UnsignedTx,
  signingType: SigningType = SigningType.AVALANCHE,
): Uint8Array {
  const message = unsignedTx.toBytes();
  return messageHash(message, signingType);
}

export function messageHash(
  message: Uint8Array,
  signingType: SigningType = SigningType.AVALANCHE,
): Uint8Array {
  switch (signingType) {
    case SigningType.AVALANCHE:
      return sha256(message);
    case SigningType.ETH: {
      const hash = bytesToHex(sha256(message));
      return keccak_256
        .create()
        .update(
          Buffer.from(
            `\x19Ethereum Signed Message:\n${hash.length}${hash}`,
          ) as any,
        )
        .digest();
    }
    default:
      throw new Error('Unknown signing type');
  }
}

export function addressesToSign(unsignedTx: UnsignedTx): Uint8Array[] {
  return unsignedTx.addressMaps.getAddresses();
}

export function signTx(tx: UnsignedTx, signingData: SigningData[]): void {
  for (const data of signingData) {
    const coordinates = tx.getSigIndicesForPubKey(data.publicKey);
    if (coordinates) {
      coordinates.forEach(([index, subIndex]) => {
        tx.addSignatureAt(data.signature, index, subIndex);
      });
    }
  }
}
