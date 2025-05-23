const generateUserId=(): number =>{
   return Math.floor(Math.random() * 10000);
}

const generateEmployeeId = (id: number)=>{
    const firstTag = 'CA'
    const lastTwo = id.toString().slice(-3);
    return  `${firstTag}${lastTwo}`
}

export {generateUserId,generateEmployeeId}