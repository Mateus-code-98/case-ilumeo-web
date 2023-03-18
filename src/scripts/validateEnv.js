require("dotenv/config");

const Yup = require("yup");

const REQUIRED_MESSAGE = (path) => `${path} is required`;

const STRING = (path) => Yup.string().required(REQUIRED_MESSAGE(path));

const NUMBER = (path) => Yup.number().required(REQUIRED_MESSAGE(path));

const envSchema = Yup.object().shape({
    PORT: NUMBER("PORT"),
    REACT_APP_API: STRING("REACT_APP_API")
});

const ENVS = {
    PORT: process.env.PORT,
    REACT_APP_API: process.env.REACT_APP_API
}

const execute = async () => {
    const { haveError, messages } = await validateSchemaService({
        data: ENVS,
        schema: envSchema
    });

    if (haveError) {
        console.log("\n");
        messages.forEach((message) => console.log("🔴 " + message + "\n"));
        process.exit(1);
    }
    else {
        const message = "Environment variables are valid";
        console.log("\n🟢 " + message + "\n");
    }
};

const validateSchemaService = async (props) => {
    const { schema, data } = props;

    try {
        await schema.validate(data, { abortEarly: false });

        return { haveError: false, messages: "" };
    } catch (err) {

        return { haveError: true, messages: err.errors ?? [] };
    }

};

execute();