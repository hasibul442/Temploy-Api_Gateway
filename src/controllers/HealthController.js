
export async function healthCheck(req, res) {
    await res.status(200).json(
        {
            status: true,
            message: "API is running successfully"
        }
    );
}