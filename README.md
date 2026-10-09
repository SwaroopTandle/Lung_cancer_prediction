# LungSure – Lung Cancer Prediction

LungSure is a machine learning web application that predicts a lung cancer classification based on user-provided health-related survey features. It uses Logistic Regression for prediction, FastAPI for the backend, and React for the frontend.

> **Disclaimer:** This project is for educational and research purposes only. Predictions are not medical diagnoses and must not be used for clinical decisions. Consult a qualified healthcare professional for medical advice.

## Features

- Predicts a lung cancer classification using 15 input features.
- Displays the predicted class and model-estimated probability.
- Clean, interactive React user interface.
- FastAPI REST API for machine learning inference.
- Data preprocessing and feature scaling using Scikit-learn.
- Model evaluation using accuracy, precision, recall, F1-score, confusion matrix, and ROC-AUC.

## Tech Stack

**Frontend**
- React
- JavaScript
- HTML
- CSS
- Vite

**Backend**
- Python
- FastAPI
- Uvicorn
- Pydantic

**Machine Learning and Data Processing**
- Pandas
- NumPy
- Scikit-learn
- Logistic Regression
- Joblib

## Project Structure

```text
LungSure-Lung-Cancer-Prediction/
├── backend/
│   ├── main.py
│   ├── lung_cancer_model.pkl
│   └── scaler.pkl
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   └── App.css
│   ├── public/
│   ├── package.json
│   └── vite.config.js
├── .gitignore
└── README.md
```

## Dataset

The project uses a lung cancer survey dataset sourced from Kaggle.

- Original records: 309
- Records after duplicate removal: 276
- Input features: 15
- Target variable: `LUNG_CANCER`
- Target classes: `YES` and `NO`

The features include age, gender, smoking, fatigue, coughing, wheezing, chest pain, shortness of breath, and other survey responses.

## Machine Learning Workflow

1. Load and inspect the dataset.
2. Remove duplicate records.
3. Perform exploratory data analysis (EDA).
4. Encode categorical variables into numerical values.
5. Separate features and the target variable.
6. Split the data into training and testing sets using stratification.
7. Standardize features using `StandardScaler`.
8. Train a Logistic Regression classifier.
9. Evaluate model performance on the test set.
10. Save the trained model and scaler using Joblib.
11. Integrate the model with FastAPI and React.

## Model Performance

The model achieved the following results on one train-test split:

| Metric | Score |
|---|---:|
| Accuracy | 89.29% |
| ROC-AUC | 94.27% |
| Precision (YES class) | 92% |
| Recall (YES class) | 96% |
| F1-score (YES class) | 94% |

**Note:** The dataset is small and imbalanced. These results do not establish clinical accuracy or guarantee performance on new data.

## Run Locally

### Prerequisites

- Python 3.10 or a compatible version
- Node.js and npm
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR-USERNAME/LungSure-Lung-Cancer-Prediction.git
cd LungSure-Lung-Cancer-Prediction
```

Replace `YOUR-USERNAME` with your GitHub username.

### 2. Start the Backend

Navigate to the backend directory:

```bash
cd backend
```

Create a virtual environment:

```bash
python -m venv venv
```

Activate it on Windows:

```powershell
venv\Scripts\activate
```

Install the required dependencies:

```bash
pip install fastapi uvicorn pandas numpy scikit-learn joblib
```

Start the FastAPI server:

```bash
uvicorn main:app --reload
```

The backend will be available at:

- API: http://127.0.0.1:8000
- Interactive API documentation: http://127.0.0.1:8000/docs

Ensure `lung_cancer_model.pkl` and `scaler.pkl` are present in the backend directory.

### 3. Start the Frontend

Open a new terminal and navigate to the frontend directory from the project root:

```bash
cd frontend
```

Install the frontend dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL provided by Vite, usually:

http://localhost:5173

Ensure the frontend API URL points to the running FastAPI backend.

## Future Improvements

- Deploy the frontend and backend to cloud hosting platforms.
- Evaluate performance using cross-validation and independent test data.
- Compare Logistic Regression with other classification algorithms.
- Improve handling of class imbalance.
- Add automated tests and improve API error handling.

## Author

**Swaroop Tandle**

B.E. in Computer Science and Engineering (Data Science)

- GitHub: [SwaroopTandle](https://github.com/SwaroopTandle)
- LinkedIn: [swarooptandle](https://www.linkedin.com/in/swarooptandle/)

---

If you find this project useful, consider giving the repository a ⭐.
