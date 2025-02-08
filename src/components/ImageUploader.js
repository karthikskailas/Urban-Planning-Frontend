import React, { useState } from "react"
import axios from "axios"
import ReactMarkdown from "react-markdown"

const ImageUploader = () => {
	const [image, setImage] = useState(null)
	const [uploadStatus, setUploadStatus] = useState("")
	const [expansionPlan, setExpansionPlan] = useState("")

	const handleImageUpload = async (event) => {
		const file = event.target.files[0]
		if (file) {
			const reader = new FileReader()
			reader.onload = (e) => setImage(e.target.result)

			const formData = new FormData()
			formData.append("map_image", file)

			try {
				setUploadStatus("Uploading & Processing...")
				const response = await axios.post(
					"http://127.0.0.1:8000/api/process-map/",
					formData,
					{
						headers: {
							"Content-Type": "multipart/form-data",
						},
					}
				)

				if (response.data) {
					setUploadStatus("Processing Complete!")
					setExpansionPlan(response.data.urban_expansion_plan)
				} else {
					setUploadStatus("Failed to process image.")
				}
			} catch (error) {
				setUploadStatus("Error uploading & processing image.")
				console.error(error)
			}

			reader.readAsDataURL(file)
		}
	}

	return (
		<div
			style={{
				minHeight: "100vh",
				backgroundColor: "#f3f4f6",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				padding: "20px",
			}}>
			<div
				style={{
					backgroundColor: "white",
					boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
					borderRadius: "12px",
					padding: "24px",
					width: "100%",
					maxWidth: "500px",
					textAlign: "center",
				}}>
				<h2>Upload City Map for Urban Planning</h2>

				<input
					type='file'
					accept='image/*'
					onChange={handleImageUpload}
					style={{
						display: "block",
						width: "100%",
						padding: "10px",
						margin: "10px 0",
						borderRadius: "8px",
						border: "1px solid #ccc",
					}}
				/>

				{image && (
					<div style={{ marginTop: "20px" }}>
						<h3>Uploaded Map:</h3>
						<img
							src={image}
							alt='Uploaded'
							style={{ width: "100%", borderRadius: "8px" }}
						/>
					</div>
				)}

				{uploadStatus && <p>{uploadStatus}</p>}

				{expansionPlan && (
					<div
						style={{
							marginTop: "20px",
							backgroundColor: "white",
							padding: "16px",
							borderRadius: "8px",
							boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
							textAlign: "left",
						}}>
						<h3>AI-Generated Urban Expansion Plan</h3>
						<ReactMarkdown>{expansionPlan}</ReactMarkdown>
					</div>
				)}
			</div>
		</div>
	)
}

export default ImageUploader
