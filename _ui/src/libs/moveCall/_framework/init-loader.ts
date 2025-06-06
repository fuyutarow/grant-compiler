import * as package_onchain_1 from "../_dependencies/onchain/0x1/init";
import * as package_onchain_2 from "../_dependencies/onchain/0x2/init";
import * as package_onchain_1eeb55d09f4bed6e03df6ca25b70eccef7fa1c3cfa640e2679cd9ea8719bfaf0 from "../counter/init";
import {StructClassLoader} from "./loader";

function registerClassesOnchain(loader: StructClassLoader) { package_onchain_1.registerClasses(loader);
package_onchain_2.registerClasses(loader);
package_onchain_1eeb55d09f4bed6e03df6ca25b70eccef7fa1c3cfa640e2679cd9ea8719bfaf0.registerClasses(loader);
 }

export function registerClasses(loader: StructClassLoader) { registerClassesOnchain(loader); }
