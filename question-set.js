const questions = [
    {
        title: 'Find reverse',
        description: 'Create a function "findReverseOfStrInAnotherStr" to find a reverse of a string in another string',
        code: `
const findReverseOfStrInAnotherStr = (str1, str2) => {
    // your code here
}
        `,
        difficulty: 'easy',
        language: 'javascript',
        testCases: `
describe('findReverseOfStrInAnotherStr', () => {
    it('should return true if reverse of str1 is in str2', () => {
        expect(findReverseOfStrInAnotherStr('abc', 'adfcadaabc')).toBe(true);
    });
    
    it('should return false if reverse of str1 is not in str2', () => {
        expect(findReverseOfStrInAnotherStr('df', 'adfcadaab')).toBe(false);
    });
});
        `
    },
    {
        title: 'Snake to camel',
        description: 'Create a function "convertSnakeToCamelCase" to convert a string from snake_case to camelCase',
        code: `
const convertSnakeToCamelCase = (str) => {
    // your code here
}
        `,
        difficulty: 'medium',
        language: 'javascript',
        testCases: `
describe('convertSnakeToCamelCase', () => {
    it('should return camelCase string', () => {
        expect(convertSnakeToCamelCase('df_camel_case')).toBe('dfCamelCase');
    });

    it('should return camelCase string, handling numbers properly', () => {
        expect(convertSnakeToCamelCase('df_camel_case_2')).toBe('dfCamelCase2');
    });
});
        `
        
    },
    {
        title: 'Find longest word',
        description: 'Create a function "findLongestWord" to find the longest word in a string',
        code: `
const findLongestWord = (str) => {
    // your code here
}
        `,
        difficulty: 'hard',
        language: 'javascript',
        testCases: `
describe('findLongestWord', () => {
    it('should return the longest word in a string', () => {
        expect(findLongestWord('asdfasdf jhsabd cajksbhdfa sh d asjdf ajsdhfbasj dfb')).toBe('cajksbhdfa');
    });

    it('should return the longest word in a string, handling numbers properly', () => {
        expect(findLongestWord('2134 2314123 42342342342342 sdfasdf')).toBe('42342342342342');
    });

    it('should return the longest word in a string, handling single word properly', () => {
        expect(findLongestWord('sdffffffsasdfasdfasdfasafs')).toBe('sdffffffsasdfasdfasdfasafs');
    });
});
        `
    },
    {
        title: 'Recursive array transform',
        description: 'Create a function "recursiveArrayTransform" to transform an array of arrays into an array of objects',
        code: `
const recursiveArrayTransform = (arr) => {
    // your code here
}
        `,
        difficulty: 'medium',
        language: 'javascript',
        testCases: `
describe('recursiveArrayTransform', () => {
    it('should return an array of objects', () => {
        const arr = [['a', 'b', 'c'], ['d', 'e', 'f'], ['g', 'h', 'i']];
        const result = recursiveArrayTransform(arr);
        expect(result).toEqual([{a: 'a', b: 'b', c: 'c'}, {d: 'd', e: 'e', f: 'f'}, {g: 'g', h: 'h', i: 'i'}]);
    });
});
        `,
    },
    {
        title: 'Str repeat',
        description: 'Create a function "strRepeat" to repeat a string n times',
        code: `
const strRepeat = (str, n) => {
    // your code here
}
        `,
        difficulty: 'easy',
        language: 'javascript',
        testCases: `
describe('strRepeat', () => {
    it('should return a repeated string n times', () => {
        const result = strRepeat('hello', 3);
        expect(result).toEqual('hellohellohello');
    });
    it('should return empty string is input is empty', () => {
        const result = strRepeat('', 3);
        expect(result).toEqual('');
    });
});
        `,
    },
    {
        title: 'Find the missing number',
        description: 'Create a function "findMissingNumber" to find the missing number in a sequence of numbers',
        code: `
const findMissingNumber = (arr) => {
    // your code here
}
        `,
        difficulty: 'medium',
        language: 'javascript',
        testCases: `
describe('findMissingNumber', () => {
    it('should return the missing number', () => {
        const result = findMissingNumber([1, 2, 3, 4, 6, 7, 8, 9, 10]);
        expect(result).toEqual(5);
    });
    it('should return null if the array is not missing a number', () => {
        const result = findMissingNumber([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
        expect(result).toEqual(null);
    });
    it('should return null if the array is empty', () => {
        const result = findMissingNumber([]);
        expect(result).toEqual(null);
    });
});
        `
    },
    {
        title: 'String to number',
        description: 'Create a function "stringToNumber" to convert a string to a number. The function should return null if the string is not a number. Extract the number from the string and return it as a number',
        code: `
const stringToNumber = (str) => {
    // your code here
}
        `,
        difficulty: 'easy',
        language: 'javascript',
        testCases: `
describe('stringToNumber', () => {
    it('should return null if the string is not a number', () => {
        expect(stringToNumber('abc')).toBe(null);
    });

    it('should return the number from the string, handling decimal correctly', () => {
        expect(stringToNumber('123')).toBe(123);
        expect(stringToNumber('123.45')).toBe(123.45);
        expect(stringToNumber('123.45.67')).toBe(123.45);
    });

    it('should return 0 if str does not have any number', () => {
        expect(stringToNumber('abc')).toBe(0);
        expect(stringToNumber('')).toBe(0);
    });

    it('should return the number from the string, handling mixed strings correctly', () => {
        expect(stringToNumber('123abc')).toBe(123);
        expect(stringToNumber('123.abc')).toBe(123);
        expect(stringToNumber('abc123sdsds454')).toBe(123454);
        expect(stringToNumber('abc123sdsds454.45')).toBe(123454.45);
        expect(stringToNumber('abc123sdsds454.45.67')).toBe(123454.45);
    });
});
        `
    },
    {
        title: 'Str sanitizer',
        description: 'Create a function "strSanitizer" to remove all non-alphanumeric characters from a string',
        code: `
const strSanitizer = (str) => {
    // your code here
}
        `,
        difficulty: 'easy',
        language: 'javascript',
        testCases: `
describe('strSanitizer', () => {
    it('should remove all non-alphanumeric characters from a string', () => {
        expect(strSanitizer('#$&^|\\Adfadfw&&^&^er345')).toBe('Adfadfwer345');
        expect(strSanitizer('#$&^|\\Adfadfw&&^&^er345.45')).toBe('Adfadfwer345.45');
        expect(strSanitizer('#$&^|\\Adfadfw&&  ^&  ^er345  .45.67')).toBe('Adfadfwer345.45.67');
        expect(strSanitizer('<bad code>hack()</bad>')).toBe('bad codehack()bad');
    });
});
        `
    },        
]

console.log(JSON.stringify(questions));


