export const getDescriptionByTitle = async (request: any, titles: Array<string>): Promise<string> => {
    const description = await request.data.data.filter((activity: any) => {
        if (activity) {
            const titleWithoutAccent: string = activity.attributes.title.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
            if (titles.includes(titleWithoutAccent)) {
                return activity.attributes.description;
            }
        }
    });

    return description[0].attributes.description;
}

export const convertDescriptionToArray = (description: string): Array<string> => {
    const splittedArray: string[] = description.split("\n");    
    let arrayOfNames: string[] = getValidNames(splittedArray);

    return arrayOfNames;
}

export const getValidNames = (splittedByLineBreak: string[]): string[] => {
    let arrayOfNames: string[] = [];

    splittedByLineBreak.forEach(name => {        
        if (name.trim()[0] === "-") {           
            arrayOfNames.push(name.replace("-", "").trim().slice(0,name.length));
        }
    })

    return arrayOfNames;
}

export const fixBigStrings = (name: string): string => {
    let fixedString: string = name;
    if (name.length > 14) {
        fixedString = name.slice(0, 12);
        fixedString += "...";
    }

    return fixedString;
}

export const getSecondName = (splittedName: string[]): string => {
    const secondNames: string[] = splittedName.slice(1, splittedName.length + 1);
    const secondName = secondNames.join(" ");

    return secondName;
}