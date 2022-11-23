export default class Helper {

    /* Returns the reading state of a book based on a given boolean */
    static getReadText(bool) {
        return bool? 'Read' : 'Not Read';
    }
    
}