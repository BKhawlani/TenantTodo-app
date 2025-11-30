import {
  forgotPasswordService,
  resetPasswordService,
} from "./password.service.js";

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const message = await forgotPasswordService(email);

    res.json({ message });
  } catch (err) {
    console.error("FORGOT PASSWORD ERROR:", err);
    res.status(500).json({ error: "Server error" });
  }
};


export const resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;

    const message = await resetPasswordService(token, password);

    res.json({ message });
  } catch (err) {
    console.error("RESET PASSWORD ERROR:", err);
    res.status(400).json({ error: err.message });
  }
};
