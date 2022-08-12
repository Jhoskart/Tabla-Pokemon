function validate(data) {
    
    const validateName = (name) => {
        const regex = new RegExp(/^[0-9,$]*$/);
        return regex.test(name)
    }
        let errors = {};
        if (!data.name || data.name.length > 10)  errors.name = "No more than 10 characters!";
        if (validateName(data.name)) errors.name = "must contain only letters!";
        if (data.height < 0 || data.height > 100) errors.height = "Between 0 and 100";
        if (data.weight < 0 || data.weight > 100) errors.weight = "Between 0 and 100";
        if (!/.(gif|jpeg|jpg|png)$/i.test(data.image) && data.image !== "") { errors.image = "Must be a image url with format jpg, gif, png!";
    }
        return errors;
    }
    
export default validate;