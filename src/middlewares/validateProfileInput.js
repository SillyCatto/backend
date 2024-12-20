const validateProfileEditInput = (req, res, next) => {
  try {
    const allowedProfileEditFields = [
      "name",
      "email",
      "age",
      "gender",
      "bio",
      "photoURL",
    ];

    const isEditAllowed = Object.keys(req.body).every((field) => {
      return allowedProfileEditFields.includes(field);
    });

    if (!isEditAllowed) throw new Error("Invalid profile edit request");

    if (Object.hasOwn(req.body, "name") && !req.body.name)
      throw new Error("Name cannot be empty");

    next();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { validateProfileEditInput };
