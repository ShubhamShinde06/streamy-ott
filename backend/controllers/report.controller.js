import { reportModel } from "../models/report.model.js";

export const addReport = async (req, res) => {
    try {
        
        const {userId, itemId, itemType, selectedIssue, description } = req.body

        if(!["movie", "web_series"].includes(itemType)){
            return res.status(400).json({message: "Invalid item type. Use 'movie' or 'web_series'." })
        }

        const newItem = new reportModel({
            userId,
            itemId,
            itemType,
            selectedIssue,
            description
        })

        await newItem.save()
        res.status(201).json({message: "Report added successfully", data: newItem })

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Server error", error: error.message });
    }
}