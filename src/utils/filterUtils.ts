
/**
 * @description filter array of items by title
 * 
 * @param request An object that contains event datas
 * @param title The title from activity that i want
 * @returns a string that contains the item description
 */
export const getDescriptionByTitle = async (request: any, title: string): Promise<string> => {
    const description = await request.data.data.filter((activity: any) => {
        if (activity) {
            if (activity.attributes.title.trim().toLowerCase() === title) {
                return activity.attributes.description;
            }
        }
    });

    return description[0].attributes.description;
}