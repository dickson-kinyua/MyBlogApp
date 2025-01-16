export const logout = async (req, res) => {
  try {
    res.cookie("token", "").json({ message: "Logout Successful" });
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
};
