import baseAPI from "../config/axios/axiosConfig";

export const getDescription = async () : Promise<string> => {
    let description : string = "";

    await (() => {
        baseAPI.get("/services/v2/service_types/963957/plans/59630660/items")
        .then(response => {
            response.data.data.forEach((activity : any) => {
                if(activity.attributes.title.trim().toLowerCase() === "intercessão"){
                    description = activity.attributes.description;       
                    console.log(description);         
                }
            });
        })
        .catch(err => {
            console.error("ops! ocorreu um erro " + err);
        });
    })()
    
    return description;
}