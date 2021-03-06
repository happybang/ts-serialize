import {Json} from "ts-json-definition"
import {None, Optional, Some} from "scalts"


import {Unmarshaller, defaultMarshaller, defaultUnmarshaller, Marshaller} from "../transformers"
import Serializable from "../core/Serializable"
import SerializersMapper from "../core/SerializersMapper"


function Serialize< T >(mbJsonPropertyName ?: string, unmarshaller: Unmarshaller< T > = defaultUnmarshaller, marshaller: Marshaller< T > = defaultMarshaller, mbGivenType: Optional< any > = None) {

    return function (target: any, classPropertyName: string) {

        if (!Serializable.prototype.isPrototypeOf(target)) {
            console.error(`Serialize decorator can only be used on a Serializable class.`);
            return;
        }

        let reflectedType = null;
        const jsonPropertyName = mbJsonPropertyName || classPropertyName;

        if (mbGivenType.isEmpty) {

            // type should be given to SerializeOpt / SerializeArray for Option / Array

            reflectedType = Reflect.getMetadata('design:type', target, classPropertyName);

            if (reflectedType === Array) {
                console.warn(`Please use SerializeArray instead of Serialize for Array serialization.`);
                return;
            }

            if (reflectedType === Optional) {
                console.warn(`Please use SerializeOpt instead of Serialize for Optional serialization.`);
                return;
            }
        }

        const mbReflectedType = reflectedType ? Some(reflectedType) : None;
        const mbType = mbGivenType.isEmpty ? mbReflectedType : mbGivenType;

        SerializersMapper.registerField(target, {
            unmarshaller: (value: any, json: Json, clazz: any, jsonPath: string[], classPath: string[]) => unmarshaller(value, json, clazz, jsonPropertyName, classPropertyName, target, mbType, jsonPath, classPath),
            marshaller: (value: any, json: Json, clazz: any) => marshaller(value, json, clazz, jsonPropertyName, classPropertyName, target, mbType),
            classPropertyName,
            jsonPropertyName
        });
    }
}

export default Serialize