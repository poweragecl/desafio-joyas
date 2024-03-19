const HATEOAS = async(entity, data) => {
    const results = data.map((item) => {
        return{
            name: item.nombre,
            href: `http://localhost:3000/api/v1/${entity}/${item.id}`,
            //stock: item.stock,
        }
    })//.slice(0,4)
    console.log(results);
    const totalJoyas =  data.length //total registros db
    const stockTotal = data.reduce((total, item) => total + item.stock, 0);

    const dataWithHateoas ={
        totalJoyas,
        stockTotal,
        results,
    };
    console.log(dataWithHateoas);
    return dataWithHateoas;
};

export default HATEOAS;