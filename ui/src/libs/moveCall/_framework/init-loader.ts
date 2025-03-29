import * as package_onchain_1 from '../_dependencies/onchain/0x1/init';
import * as package_onchain_2 from '../_dependencies/onchain/0x2/init';
import * as package_source_1 from '../_dependencies/source/0x1/init';
import * as package_onchain_1eeb55d09f4bed6e03df6ca25b70eccef7fa1c3cfa640e2679cd9ea8719bfaf0 from '../counter/init';
import * as package_onchain_299ff359ad6d0f8abdb27aba1f7e2b71555a5c74d26deee3f5b2c3e2d6839eb7 from '../grant-compiler/init';
import * as package_source_2 from '../sui/init';
import { StructClassLoader } from './loader';

function registerClassesSource(loader: StructClassLoader) {
  package_source_1.registerClasses(loader);
  package_source_2.registerClasses(loader);
}

function registerClassesOnchain(loader: StructClassLoader) {
  package_onchain_1.registerClasses(loader);
  package_onchain_2.registerClasses(loader);
  package_onchain_1eeb55d09f4bed6e03df6ca25b70eccef7fa1c3cfa640e2679cd9ea8719bfaf0.registerClasses(
    loader,
  );
  package_onchain_299ff359ad6d0f8abdb27aba1f7e2b71555a5c74d26deee3f5b2c3e2d6839eb7.registerClasses(
    loader,
  );
}

export function registerClasses(loader: StructClassLoader) {
  registerClassesOnchain(loader);
  registerClassesSource(loader);
}
