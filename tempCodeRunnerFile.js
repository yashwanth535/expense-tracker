Define a schema and model
const dataSchema = new mongoose.Schema({
    name: String,
    email: String
});

const Data = mongoose.model('Data', dataSchema);