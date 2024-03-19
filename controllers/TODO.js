// const Task = require("../model/Task.js");
const Task = require("../model/Task.js");

// GET ALL TASK OF A USER
exports.GetTask = async (req, res) => {
  // console.log("herererer");
  //console.log(req.user.id)
  try {
  
    const result = await Task.findOne({ id: req.user.id });
    
    if (result) {
      return res.status(200).json(result);
    } else {
      return res.status(400).send("No Task present");
    }
  } catch (error) {
    res.status(500).send("Internal Server error");
  }
};

exports.AddTask = async (req, res) => {
  //console.log("ejee");
  const { title, desciption } = req.body;
  const userId = req.user.id;

  if (!title || !desciption) {
    return res.status(400).send("Please fill all fields.");
  }

  try {
    let userTask = await Task.findOne({ id: userId });

    if (userTask) {
      userTask.notes.push({ title, desciption });
      await userTask.save();
    } else {
      userTask = new Task({ id: userId, notes: [{ title, desciption }] });
      await userTask.save();
    }

    return res.status(200).send("Successfully added task.");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
};

//REMOVING A TASK
exports.RemoveTask = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const result = await Task.updateOne(
      { id: userId },
      { $pull: { notes: { _id: id } } }
    );

    if (result.nModified === 0) {
      return res.status(404).send("Note not found.");
    }
    const updatedUser = await Task.findOne({ id: userId });

    //  console.log(result);

    // Send the updated user data in the response
    return res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
};

//UPDATE BOOK
exports.UpdateTask = async (req, res) => {
  //console.log("nkewkve");
  const { id } = req.params;
  const userId = req.user.id;
  const { title, desciption } = req.body;
  // console.log(title, description )
  try {
    let task = await Task.findOne({ id: userId });
    let a = task.notes;
    let update = false;
    for (i = 0; i < a.length; i++) {
      //  console.log(a[i]._id);
      if (a[i]._id.toString() == id) {
        task.notes[i].title = title;
        task.notes[i].desciption = desciption;

        update = true;
        break;
      }
    }
    if (!update) {
      return res.status(404).send("Note not found.");
    }
    await task.save();
    return res.status(200).send("Note updated successfully.");
  } catch (error) {
    //console.log(error);
    res.status(500).send("Internal Server error");
  }
};
