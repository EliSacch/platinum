/**
 * This function is used to calculate the time slots and the relative label
 * to be displayed as key, value pair in time select inpits
 * @param {integer} start // This is the first available time (for example 900 for 9:00am)
 * @param {integer} end // This is the last available time (for example 1650 for 16:30)
 * These first two parameters calculate how many slots
 * @param {integer} offset // This parameter indicated ow much we need to 
 * offset the beginning value from 00:00
 * @returns 
 */
export const calculateTimeSlots = (start, end, offset) => {

    // Set the minimum and max time
    const min_time = start;
    const max_time = end;
    // determine the range
    const range = (max_time - min_time) / 50;

    // get the range
    const options = [...Array(range).keys()];

    // create a new array from the range, to get the valid time values in the range
    const slots = options.map(option => offset + ((option + 1) * 50));
    const labels = [];
    for (let slot of slots) {
        let label = slot % 100 === 0 ? (
            `${slot / 100}:00`
        ) : (
            `${(slot - (slot % 100)) / 100}:30`
        );
        labels.push(label);
    }

    // create the final choices to display, based on the slots
    const choices = slots.map((slot, i) => (
        { value: slot, label: labels[i] }
    ));
    return choices
}

export default calculateTimeSlots

