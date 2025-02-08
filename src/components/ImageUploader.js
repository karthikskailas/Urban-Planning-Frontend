import React, { useState } from "react"
import axios from "axios"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm" // Supports tables & advanced markdown features

const ImageUploader = () => {
	const [image, setImage] = useState(null)
	const [uploadStatus, setUploadStatus] = useState("")
	const [expansionPlan, setExpansionPlan] = useState(null)

	const handleImageUpload = async (event) => {
		const file = event.target.files[0]
		if (file) {
			const reader = new FileReader()
			reader.onload = (e) => setImage(e.target.result)

			// Create a FormData object and append the file
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
					setExpansionPlan(response.data.markdown_plan) // Fetch markdown formatted response
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
				<h2
					style={{
						fontSize: "24px",
						fontWeight: "bold",
						marginBottom: "16px",
					}}>
					Upload and Process Map
				</h2>

				<input
					type='file'
					accept='image/*'
					onChange={handleImageUpload}
					style={{
						display: "block",
						width: "100%",
						fontSize: "14px",
						padding: "10px",
						margin: "10px -10px",
						borderRadius: "8px",
						border: "1px solid #ccc",
					}}
				/>

				{image && (
					<div style={{ marginTop: "20px" }}>
						<h3
							style={{
								fontSize: "18px",
								fontWeight: "500",
								marginBottom: "10px",
							}}>
							Uploaded Map:
						</h3>
						<img
							src={image}
							alt='Uploaded'
							style={{ width: "100%", borderRadius: "8px" }}
						/>
					</div>
				)}

				{uploadStatus && (
					<p
						style={{
							marginTop: "16px",
							fontSize: "14px",
							color: "#555",
						}}>
						{uploadStatus}
					</p>
				)}

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
						<h3
							style={{
								fontSize: "20px",
								fontWeight: "bold",
								marginBottom: "10px",
								textAlign: "center",
							}}>
							AI-Generated Expansion Plan
						</h3>
						<ReactMarkdown remarkPlugins={[remarkGfm]}>
							{expansionPlan}
						</ReactMarkdown>
					</div>
				)}
			</div>
		</div>
	)
}

export default ImageUploader
