import * as counter from "./counter/structs";
import {StructClassLoader} from "../_framework/loader";

export function registerClasses(loader: StructClassLoader) { loader.register(counter.Counter);
 }
