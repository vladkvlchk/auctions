export const createAuction = async (event, context) => {
    const {title} = JSON.parse(event.body);

    const createdAt = (new Date()).toISOString();

    const auction = {
        title,
        status: "OPEN",
        createdAt
    }
     
    return {
        statusCode: 201,
        body: JSON.stringify(auction)
    }
};

export const handler = createAuction;