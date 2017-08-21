import test from "ava"

import {Serializable, Serialize} from "../src"


(async function() {

    class Foo extends Serializable {
        @Serialize(String)
        public str : string[];
    }

    test(`Error message when there is no reader found with Array`, t => {

        return Foo.fromJsObject<Foo>({})
            .then(() => t.fail('An error should be raised when an array reader is not found'))
            .catch((err : Error) => {
                const expected = "Cannot find reader for property Foo.str of type 'Array<String>'.";
                t.deepEqual(err.message, expected);
            });
    });

    test(`Error message when there is no writer found with Array`, t => {

        return new Foo().toJson()
            .then(() => t.fail('An error should be raised when an array writer is not found'))
            .catch((err : Error) => {
                const expected = "Cannot find writer for property Foo.str of type 'Array<String>'.";
                t.deepEqual(err.message, expected);
            });
    });


    class ComplexFoo extends Serializable {

        @Serialize([String,Array,[Map,[String,Number]]])
        public complexType: Map<String, Array<Map<String, Number>>>;
    }

    test(`Error message when there is no reader found with complex types`, t => {

        return ComplexFoo.fromJsObject<ComplexFoo>({})
            .then(() => t.fail('An error should be raised when a reader is not found'))
            .catch((err : Error) => {
                const expected = "Cannot find reader for property ComplexFoo.complexType of type 'Map<String, Array<Map<String, Number>>>'.";
                t.deepEqual(err.message, expected);
            });
    });

    test(`Error message when there is no writer found with complex types`, t => {

        return new ComplexFoo().toJson()
            .then(() => t.fail('An error should be raised when a writer is not found'))
            .catch((err : Error) => {
                const expected = "Cannot find writer for property ComplexFoo.complexType of type 'Map<String, Array<Map<String, Number>>>'.";
                t.deepEqual(err.message, expected);
            });
    });

}());
