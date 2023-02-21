import { acir_from_bytes } from '@noir-lang/noir_wasm';
import { setup_generic_prover_and_verifier, create_proof, verify_proof } from '@noir-lang/barretenberg/dest/client_proofs';
import { resolve } from 'path';
import { readFileSync } from 'fs';
import { expect } from 'chai';

describe("Circuit", function () {
    it("verifies valid input", async () => {
      const acirByteArray = path_to_uint8array(resolve(__dirname, '../circuits/target/p.acir'));
      let acir = acir_from_bytes(acirByteArray);

      const [prover, verifier] = await setup_generic_prover_and_verifier(acir);
      let abi = { a: 1, b: 2 };

      const proof = await create_proof(prover, acir, abi);
      console.log('proof: ' + proof.toString('hex'));

      const verified = await verify_proof(verifier, proof);
      console.log("proof is valid: " + verified);

      expect(verified).eq(true)
    });
});

function path_to_uint8array(path: string) {
    let buffer = readFileSync(path);
    return new Uint8Array(buffer);
}
