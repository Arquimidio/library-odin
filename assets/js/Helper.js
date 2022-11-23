export default class Helper {

    /* Returns the reading state of a book based on a given boolean */
    static getReadText(bool) {
        return bool? 'Read' : 'Not Read';
    }

    /* Transforms a number inside a string into a boolean (mainly to be used with 0 and 1)*/
    static strToBol(str) {
        return Boolean(Number(str));
    }

}