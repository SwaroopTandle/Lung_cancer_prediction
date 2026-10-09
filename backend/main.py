from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import pandas as pd


app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# Load trained model and scaler
model = joblib.load("lung_cancer_model.pkl")
scaler = joblib.load("scaler.pkl")


# Input structure
class PatientData(BaseModel):
    GENDER: int
    AGE: int
    SMOKING: int
    YELLOW_FINGERS: int
    ANXIETY: int
    PEER_PRESSURE: int
    CHRONIC_DISEASE: int
    FATIGUE: int
    ALLERGY: int
    WHEEZING: int
    ALCOHOL_CONSUMING: int
    COUGHING: int
    SHORTNESS_OF_BREATH: int
    SWALLOWING_DIFFICULTY: int
    CHEST_PAIN: int


@app.get("/")
def home():
    return {"message": "Lung Cancer Prediction API is running"}


@app.post("/predict")
def predict(data: PatientData):

    input_data = pd.DataFrame([{
        "GENDER": data.GENDER,
        "AGE": data.AGE,
        "SMOKING": data.SMOKING,
        "YELLOW_FINGERS": data.YELLOW_FINGERS,
        "ANXIETY": data.ANXIETY,
        "PEER_PRESSURE": data.PEER_PRESSURE,
        "CHRONIC DISEASE": data.CHRONIC_DISEASE,
        "FATIGUE ": data.FATIGUE,
        "ALLERGY ": data.ALLERGY,
        "WHEEZING": data.WHEEZING,
        "ALCOHOL CONSUMING": data.ALCOHOL_CONSUMING,
        "COUGHING": data.COUGHING,
        "SHORTNESS OF BREATH": data.SHORTNESS_OF_BREATH,
        "SWALLOWING DIFFICULTY": data.SWALLOWING_DIFFICULTY,
        "CHEST PAIN": data.CHEST_PAIN
    }])

    # Apply the same scaler used during training
    input_scaled = scaler.transform(input_data)

    # Prediction
    prediction = model.predict(input_scaled)[0]

    # Probability
    probability = model.predict_proba(input_scaled)[0][1]

    result = "YES" if prediction == 1 else "NO"

    return {
        "prediction": result,
        "probability": round(float(probability), 4)
    }