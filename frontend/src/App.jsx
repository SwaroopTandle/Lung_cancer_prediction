import { useState } from "react";
import "./App.css";

const initialForm = {
  GENDER: 0,
  AGE: 45,
  SMOKING: 0,
  YELLOW_FINGERS: 0,
  ANXIETY: 0,
  PEER_PRESSURE: 0,
  CHRONIC_DISEASE: 0,
  FATIGUE: 0,
  ALLERGY: 0,
  WHEEZING: 0,
  ALCOHOL_CONSUMING: 0,
  COUGHING: 0,
  SHORTNESS_OF_BREATH: 0,
  SWALLOWING_DIFFICULTY: 0,
  CHEST_PAIN: 0,
};

const fields = [
  ["GENDER", "Gender"],
  ["AGE", "Age"],
  ["SMOKING", "Smoking"],
  ["YELLOW_FINGERS", "Yellow Fingers"],
  ["ANXIETY", "Anxiety"],
  ["PEER_PRESSURE", "Peer Pressure"],
  ["CHRONIC_DISEASE", "Chronic Disease"],
  ["FATIGUE", "Fatigue"],
  ["ALLERGY", "Allergy"],
  ["WHEEZING", "Wheezing"],
  ["ALCOHOL_CONSUMING", "Alcohol Consuming"],
  ["COUGHING", "Coughing"],
  ["SHORTNESS_OF_BREATH", "Shortness of Breath"],
  ["SWALLOWING_DIFFICULTY", "Swallowing Difficulty"],
  ["CHEST_PAIN", "Chest Pain"],
];

function App() {
  const [formData, setFormData] = useState(initialForm);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: Number(value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/predict",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Prediction failed");
      }

      const data = await response.json();

      setResult(data);
    } catch (error) {
      console.error(error);

      setError(
        "Unable to connect to the prediction server."
      );
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData(initialForm);
    setResult(null);
    setError("");
  };

  const isPositive = result?.prediction === "YES";

  return (
    <div className="app">

      {/* NAVBAR */}

      <header className="navbar">

        <div className="logo-area">

          <div className="logo">
            ✦
          </div>

          <div>
            <h1>
              Lung<span>Sure</span>
            </h1>

            <p>
              LUNG CANCER PREDICTION
            </p>
          </div>

        </div>


        <div className="nav-status">

          <span className="status-dot"></span>

          Model Online

          <span className="model">
            Logistic Regression
          </span>

        </div>

      </header>


      {/* MAIN */}

      <main className="main">

        {/* LEFT */}

        <section className="form-area">

          <div className="heading">

            <span>
              PATIENT ASSESSMENT
            </span>

            <h2>
              Lung Cancer Prediction
            </h2>

            <p>
              Enter the patient information below to
              generate a prediction.
            </p>

          </div>


          <form onSubmit={handleSubmit}>

            <div className="form-grid">

              {fields.map(([key, label]) => (

                <div
                  className="field"
                  key={key}
                >

                  <label htmlFor={key}>
                    {label}
                  </label>


                  {key === "AGE" ? (

                    <input
                      id={key}
                      name={key}
                      type="number"
                      min="1"
                      max="120"
                      value={formData[key]}
                      onChange={handleChange}
                    />

                  ) : key === "GENDER" ? (

                    <select
                      id={key}
                      name={key}
                      value={formData[key]}
                      onChange={handleChange}
                    >

                      <option value={0}>
                        Female
                      </option>

                      <option value={1}>
                        Male
                      </option>

                    </select>

                  ) : (

                    <select
                      id={key}
                      name={key}
                      value={formData[key]}
                      onChange={handleChange}
                    >

                      <option value={0}>
                        No
                      </option>

                      <option value={1}>
                        Yes
                      </option>

                    </select>

                  )}

                </div>

              ))}

            </div>


            {/* ACTIONS */}

            <div className="actions">

              <button
                type="button"
                className="reset"
                onClick={resetForm}
              >
                Reset
              </button>


              <button
                type="submit"
                className="predict"
                disabled={loading}
              >

                {loading
                  ? "Analyzing..."
                  : "Predict"}

                {!loading && (
                  <span>→</span>
                )}

              </button>

            </div>

          </form>


          {error && (
            <p className="error">
              {error}
            </p>
          )}

        </section>


        {/* RIGHT */}

        <section className="result-area">

          <div className="result-heading">
            Prediction Result
          </div>


          {!result ? (

            <div className="empty-result">

              <div className="empty-icon">
                ○
              </div>

              <h3>
                No prediction yet
              </h3>

              <p>
                Complete the patient assessment
                and click Predict.
              </p>

            </div>

          ) : (

            <div className="result-content">

              <div
                className={`result-icon ${
                  isPositive ? "danger" : "success"
                }`}
              >
                {isPositive ? "!" : "✓"}
              </div>


              <p className="result-label">
                MODEL PREDICTION
              </p>


              <h2
                className={
                  isPositive
                    ? "prediction-danger"
                    : "prediction-success"
                }
              >
                Lung Cancer:{" "}
                {result.prediction}
              </h2>


              <div className="probability">

                <div>
                  <span>
                    Probability
                  </span>

                  <p>
                    Model predicted probability
                  </p>
                </div>

                <strong
                  className={
                    isPositive
                      ? "prediction-danger"
                      : "prediction-success"
                  }
                >
                  {(result.probability * 100).toFixed(2)}%
                </strong>

              </div>

            </div>

          )}


          {/* SIMPLE MODEL INFO */}

          <div className="model-info">

            <div>
              <span>MODEL</span>
              <strong>
                Logistic Regression
              </strong>
            </div>

            <div>
              <span>FEATURES</span>
              <strong>
                15 Parameters
              </strong>
            </div>

            <div>
              <span>API</span>
              <strong>
                FastAPI
              </strong>
            </div>

          </div>


          <p className="disclaimer">
            For educational and demonstration
            purposes only. Not intended for
            medical diagnosis.
          </p>

        </section>

      </main>

    </div>
  );
}

export default App;