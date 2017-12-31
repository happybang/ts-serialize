import {JsValue} from "ts-json-definition";
import {PrototypeListDefinition} from "../core/TypesDefinition";


/**
 * Validate and transform a json property into a typed class property
 *
 * @value The value of the json property to read
 * @genericTypes The generic types of the type that the value is supposed to have (useful for generic readers)
 */
type Reader<T> = (value: JsValue, prototype: Object, genericTypes: PrototypeListDefinition, classPath: string[], failFast: boolean) => Promise<T>;

export default Reader;