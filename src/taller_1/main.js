// const juan = {
//     name: "Juanito",
//     age: 18,
//     approvedCourses: ["Curso 1"],
//     addCourse(newCourse) {
//         console.log("This", this);
//         console.log("This.approvedCourses", this.approvedCourses);
//         this.approvedCourses.push(newCourse);
//     }
// };


// console.log(Object.keys(juan));
// console.log(Object.getOwnPropertyNames(juan));
// console.log(Object.entries(juan));


// Object.defineProperty(juan, "pruebaNASA", {
//     value: "Extraterrestre",
//     writable: true,
//     enumerable: true,
//     configurable: true,
// });


// Object.defineProperty(juan, "navigator", {
//     value: "Chrome",
//     writable: true,
//     enumerable: false,
//     configurable: true,
// });
// Object.defineProperty(juan, "editor", {
//     value: "VSCode",
//     writable: false,
//     enumerable: true,
//     configurable: true,
// });
// Object.defineProperty(juan, "terminal", {
//     value: "WSL",
//     writable: true,
//     enumerable: true,
//     configurable: false,
// });
// Object.defineProperty(juan, "pruebaNASA", {
//     value: "Extraterrestre",
//     writable: false,
//     enumerable: false,
//     configurable: false,
// });

//Object.seal(juan); // Pone todas las propiedades configurable = false
// Object.freeze(juan); // Pone todas las propiedades configurable y writable = false

// console.log(Object.getOwnPropertyDescriptors(juan))

// const obj1 = {
//     a: "a",
//     b: "b",
//     c: {
//         d: "d",
//         e: "e",
//     },
//     editA() {
//         this.a = "AAAA";
//     }
// };

// const obj2 = {};
// for (prop in obj1) {
//     obj2[prop] = obj1[prop];
// };

/* Shallow Copy */

// const obj3 = Object.assign({}, obj1);
// const obj4 = Object.create(obj1);

// const stringifiedComplexObj = JSON.stringify(obj1);
// const obj2 = JSON.parse(stringifiedComplexObj);

/*Recursividad*/

// function recursiva() {
//     if (/* Validacion */) {
//         // llamados recursivos
//     } else {
//         // llamados sin rec
//     }
// }

//const numeros = [555, 1, 2, 3, 4, 5, 7, 8, 9, 1235];
// let numero = 0;
// for (let i = 0; i < numeros.length; i++) {
//     numero = numeros[i];
//     console.log({i, numero});
// }

// const numeros = [555, 1, 2, 3, 4, 5, 7, 8, 9, 1235];
// function recursiva(numbersArray) {
//     if (numbersArray.length != 0) {
//         const firstNumber = numbersArray[0];
//         console.log(firstNumber);
//         numbersArray.shift();
//         recursiva(numbersArray);
//     }
// }

/* Deep copy con recursividad */

function isObject(subject) {
    return typeof subject == "object";
}

function isArray(subject) {
    return Array.isArray(subject);
}

function deepCopy(subject) {
    let copySubject;
    
    const subjectIsObject = isObject(subject);
    const subjectIsArray = isArray(subject);

    if (subjectIsArray) {
        copySubject = [];
    } else if (subjectIsObject) {
        copySubject = {};
    } else {
        return subject;
    }

    for (key in subject) {
        const keyIsObject = isObject(subject[key]);

        if (keyIsObject) {
            copySubject[key] = deepCopy(subject[key]);
        } else {
            if (subjectIsArray) {
                copySubject.push(subject[key]);
            } else {
                copySubject[key] = subject[key];
            }
        }
    }
    
    return copySubject;
}

function SuperObject() {}
SuperObject.isObject =  function(subject) {
    return typeof subject == "object";
}
SuperObject.deepCopy = function(subject) {
    let copySubject;
    
    const subjectIsObject = isObject(subject);
    const subjectIsArray = isArray(subject);

    if (subjectIsArray) {
        copySubject = [];
    } else if (subjectIsObject) {
        copySubject = {};
    } else {
        return subject;
    }

    for (key in subject) {
        const keyIsObject = isObject(subject[key]);

        if (keyIsObject) {
            copySubject[key] = deepCopy(subject[key]);
        } else {
            if (subjectIsArray) {
                copySubject.push(subject[key]);
            } else {
                copySubject[key] = subject[key];
            }
        }
    }
    
    return copySubject;
}

/*const studentBase = {
    name: undefined,
    email: undefined,
    age: undefined,
    approvedCourses: undefined,
    learningPaths: undefined,
    socialMedia: {
        twitter: undefined,
        instagram: undefined,
        facebook: undefined,
    },
};*/

/*const juan = deepCopy(studentBase);*/
// Object.defineProperty(juan, "name", {
//     value: "Juanito",
//     configurable: false,
// });
/*Object.seal(juan); // Pone cada propiedad del objeto juan como: configurable = false
Object.isSealed(juan); // Verificar si todas las propiedades del objeto tienen la proteccion configurable en false
juan.name = "Juan";*/

function requiredParam(param) {
    throw new Error(param + " is mandatory");
}

function LearningPaths({
    name = requiredParam("name"),
    courses = [],
}) {
    this.name = name;
    this.courses = courses;

    /*const private = {
        "_name": name,
        "_courses": courses,
    };

    const public = {

        get name() {
            return private["_name"];
        },
        set name(newName) {
            if (newName.length != 0) {
                private["_name"] = newName;
            } else {
                console.warn("Your name not must be empty")
            }
        },
        get courses() {
            return private["_courses"];
        },
    };

    return public;*/
}

function Student({
    name = requiredParam("name"),
    email= requiredParam("email"),
    age,
    twitter,
    instagram,
    facebook,
    approvedCourses = [],
    learningPaths = [],
} = {}) {
    this.name = name;
    this.email = email;
    this.age = age;
    this.approvedCourses = approvedCourses;
    this.socialMedia = {
        twitter,
        instagram,
        facebook,
    }

    const private = {
        "_learningPaths": [],
    };

    Object.defineProperty(this, "learningPaths", {
        get() {
            return private["_learningPaths"];
        },
        set(newLP) {
            if (newLP instanceof LearningPaths) {
                private["_learningPaths"].push(newLP);
            } else {
                console.warn("Alguno de los LP's no es una instancia del prototipo LearningPaths")
            }
        }
    });

    if (isArray(learningPaths)) {
        this._learningPaths = [];
        
        for (learningPathIndex in learningPaths) {
            this.learningPaths = learningPaths[learningPathIndex];
        }
    }

    /*const private = {
        "_name": name,
        "_learningPaths": learningPaths,
    };

    const public = {
        email,
        age,
        approvedCourses,
        socialMedia: {
            twitter,
            instagram,
            facebook,
        },
        // readName() {
        //     return private["_name"];
        // },
        // changeName(newName) {
        //     private["_name"] = newName;
        // },
        get name() {
            return private["_name"];
        },
        set name(newName) {
            if (newName.length != 0) {
                private["_name"] = newName;
            } else {
                console.warn("Your name not must be empty")
            }
        },

        get learningPaths() {
            return private["_learningPaths"];
        },
        set learningPaths(newLearningPaths) {
            if (!newLearningPaths.name) {
                console.warn("Tu LP no tiene la propiedad name");
                return;
            }
            if (!newLearningPaths.courses) {
                console.warn("Tu LP no tiene la propiedad courses");
                return;
            }
            if (!isArray(newLearningPaths.courses)) {
                console.warn("Tu LP no es una lista (*de cursos)");
                return;
            }

            private["_learningPaths"].push(newLearningPaths);
        },
    };

    // Object.defineProperty(public, "readName", {
    //     configurable: false,
    //     writable: false,
    // });
    // Object.defineProperty(public, "changeName", {
    //     configurable: false,
    //     writable: false,
    // });
    
    return public;*/
}

const escuelaWeb = new LearningPaths({
    name: "Escuela de Desarrollo Web",
    courses: []
});

const escuelaData = new LearningPaths({
    name: "Escuela de Data Science",
    courses: []
});

const juan = new Student({
    name: "Juan",
    email: "juan@juanito.com",
    learningPaths: [
        escuelaWeb,
        escuelaData,
    ],
});
