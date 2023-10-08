const Model = require("../model/topics");

const addTopic = async (data, res) => {
  const dataObj = {
    quickLink: data.quickLink,
    uploader: data.uploader,
    name: data.name,
    ranking: data.ranking,
    veto: data.veto,
    content: data.content,
  };
  const record = new Model(dataObj);

  try {
    await record.save();
    res.status(200).json({ message: "success" });
  } catch (error) {
    const errorMsg = Object.keys(error.keyValue)[0];
    res.status(400).json({ message: errorMsg + " is duplicated" });
  }
};

const editTopic = async (id, data, res) => {
  try {
    await Model.findByIdAndUpdate(id, { $set: data });
    res.status(200).json({ message: "success" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getTopic = async (flag, data, res) => {
  try {
    let response;
    if (flag === "all") {
        response = await Model.find();
    } else {
        response = await Model.findOne({ [flag]: data });
    }    
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteTopic = async (data, res) => {
    try {
        const data = await Model.findByIdAndDelete(data);
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = { addTopic, editTopic, getTopic, deleteTopic };
