import React, { useState } from "react";
import {
  Upload,
  Palette,
  Type,
  Image,
  Calendar,
  Users,
  Gift,
  Award,
  Megaphone,
  Info,
} from "lucide-react";

import img from "../img.jpg";

// Types for our application
type BrandIdentity = {
  brandName: string;
  primaryColors: string[];
  secondaryColors: string[];
  fonts: string[];
  logoUrl?: string;
};

type PosterType = "onboarding" | "birthday" | "anniversary" | "announcement";

type PosterData = {
  type: PosterType;
  title: string;
  message: string;
};

function App() {
  // State management
  const [step, setStep] = useState<number>(1);
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [brandIdentity, setBrandIdentity] = useState<BrandIdentity | null>(
    null
  );
  const [extracting, setExtracting] = useState<boolean>(false);
  const [posterType, setPosterType] = useState<PosterType>("onboarding");
  const [posterData, setPosterData] = useState<PosterData>({
    type: "onboarding",
    title: "Welcome to the Team!",
    message:
      "We're excited to have you join us. Let's achieve great things together!",
  });
  const [generatingPoster, setGeneratingPoster] = useState<boolean>(false);
  const [posterGenerated, setPosterGenerated] = useState<boolean>(false);

  // Handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);

      // Create a preview URL for the file
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target) {
          setFilePreview(event.target.result as string);
        }
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  // Simulate brand identity extraction
  const extractBrandIdentity = () => {
    setExtracting(true);

    // Simulate API call with timeout
    setTimeout(() => {
      // Mock data - in a real app, this would come from an API
      const mockBrandIdentity: BrandIdentity = {
        brandName: "Horizon Innovations",
        primaryColors: ["#CC2028", "#000000"],
        secondaryColors: ["#BCC1C4"],
        // secondaryColors: ['#BCC1C4', '#F97316', '#FBBF24'],
        fonts: ["Montserrat", "Open Sans"],
        logoUrl: img,
        // "https://images.pexels.com/photos/3756766/pexels-photo-3756766.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      };

      setBrandIdentity(mockBrandIdentity);
      setExtracting(false);
      setStep(2);
    }, 2000);
  };

  // Handle poster type selection
  const handlePosterTypeChange = (type: PosterType) => {
    setPosterType(type);

    // Update poster data based on type
    let newTitle = "";
    let newMessage = "";

    switch (type) {
      case "onboarding":
        newTitle = "Welcome to the Team!";
        newMessage =
          "We're excited to have you join us. Let's achieve great things together!";
        break;
      case "birthday":
        newTitle = "Happy Birthday!";
        newMessage =
          "Wishing you a fantastic day filled with joy and celebration!";
        break;
      case "anniversary":
        newTitle = "Work Anniversary";
        newMessage =
          "Congratulations on another year of excellence and dedication!";
        break;
      case "announcement":
        newTitle = "Important Announcement";
        newMessage = "We have exciting news to share with the entire team!";
        break;
    }

    setPosterData({
      type,
      title: newTitle,
      message: newMessage,
    });
  };

  // Handle poster data changes
  const handlePosterDataChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setPosterData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Generate poster
  const generatePoster = () => {
    setGeneratingPoster(true);

    // Simulate API call with timeout
    setTimeout(() => {
      setGeneratingPoster(false);
      setPosterGenerated(true);
      setStep(3);
    }, 2000);
  };

  // Reset the application
  const resetApp = () => {
    setStep(1);
    setFile(null);
    setFilePreview(null);
    setBrandIdentity(null);
    setPosterType("onboarding");
    setPosterData({
      type: "onboarding",
      title: "Welcome to the Team!",
      message:
        "We're excited to have you join us. Let's achieve great things together!",
    });
    setPosterGenerated(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">
              Brand Identity Analyzer
            </h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">Step {step} of 3</span>
              <div className="w-32 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-500 ease-in-out"
                  style={{ width: `${(step / 3) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Step 1: Upload and Extract */}
        {step === 1 && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">
              Upload Brand Collateral
            </h2>
            <p className="text-gray-600 mb-6">
              Upload a branding collateral file (PDF, image, or presentation) to
              extract brand identity elements.
            </p>

            <div className="mb-8">
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center ${
                  filePreview
                    ? "border-blue-300 bg-blue-50"
                    : "border-gray-300 hover:border-blue-400"
                } transition-colors duration-200`}
              >
                {filePreview ? (
                  <div className="space-y-4">
                    <div className="relative w-full max-w-md mx-auto h-64 overflow-hidden rounded-lg">
                      <img
                        src={filePreview}
                        alt="Preview"
                        className="object-contain w-full h-full"
                      />
                    </div>
                    <p className="text-sm text-gray-500">{file?.name}</p>
                    <button
                      onClick={() => {
                        setFile(null);
                        setFilePreview(null);
                      }}
                      className="text-sm text-red-600 hover:text-red-800"
                    >
                      Remove file
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex justify-center">
                      <Upload className="h-12 w-12 text-gray-400" />
                    </div>
                    <p className="text-gray-600">
                      Drag and drop your file here, or{" "}
                      <label className="text-blue-600 hover:text-blue-800 cursor-pointer">
                        browse
                        <input
                          type="file"
                          className="hidden"
                          accept=".pdf,.jpg,.jpeg,.png,.ppt,.pptx"
                          onChange={handleFileChange}
                        />
                      </label>
                    </p>
                    <p className="text-xs text-gray-500">
                      Supported formats: PDF, JPG, PNG, PPT, PPTX
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={extractBrandIdentity}
                disabled={!file || extracting}
                className={`px-4 py-2 rounded-md text-white font-medium ${
                  !file || extracting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                } transition-colors duration-200`}
              >
                {extracting ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Extracting...
                  </span>
                ) : (
                  "Extract Brand Identity"
                )}
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Brand Identity Results & Poster Configuration */}
        {step === 2 && brandIdentity && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Brand Identity Results */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">
                Extracted Brand Identity
              </h2>

              <div className="space-y-6">
                {/* Brand Name */}
                <div>
                  <h3 className="text-sm font-medium text-gray-500 flex items-center">
                    <Info className="h-4 w-4 mr-1" />
                    Brand Name
                  </h3>
                  <p className="mt-1 text-lg font-semibold">
                    {brandIdentity.brandName}
                  </p>
                </div>

                {/* Primary Colors */}
                <div>
                  <h3 className="text-sm font-medium text-gray-500 flex items-center">
                    <Palette className="h-4 w-4 mr-1" />
                    Primary Colors
                  </h3>
                  <div className="mt-2 flex space-x-2">
                    {brandIdentity.primaryColors.map((color, index) => (
                      <div key={index} className="flex flex-col items-center">
                        <div
                          className="h-10 w-10 rounded-full border border-gray-200"
                          style={{ backgroundColor: color }}
                        ></div>
                        <span className="mt-1 text-xs">{color}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Secondary Colors */}
                <div>
                  <h3 className="text-sm font-medium text-gray-500 flex items-center">
                    <Palette className="h-4 w-4 mr-1" />
                    Secondary Colors
                  </h3>
                  <div className="mt-2 flex space-x-2">
                    {brandIdentity.secondaryColors.map((color, index) => (
                      <div key={index} className="flex flex-col items-center">
                        <div
                          className="h-10 w-10 rounded-full border border-gray-200"
                          style={{ backgroundColor: color }}
                        ></div>
                        <span className="mt-1 text-xs">{color}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Fonts */}
                <div>
                  <h3 className="text-sm font-medium text-gray-500 flex items-center">
                    <Type className="h-4 w-4 mr-1" />
                    Typography
                  </h3>
                  <div className="mt-2 space-y-2">
                    {brandIdentity.fonts.map((font, index) => (
                      <div key={index} className="flex items-center">
                        <span className="text-sm">{font}</span>
                        {index === 0 && (
                          <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                            Primary
                          </span>
                        )}
                        {index === 1 && (
                          <span className="ml-2 text-xs bg-gray-100 text-gray-800 px-2 py-0.5 rounded">
                            Secondary
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Logo */}
                {brandIdentity.logoUrl && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 flex items-center">
                      <Image className="h-4 w-4 mr-1" />
                      Logo
                    </h3>
                    <div className="mt-2">
                      <img
                        src={brandIdentity.logoUrl}
                        alt="Brand Logo"
                        className="h-20 object-contain rounded-md"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Poster Configuration */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">
                Configure Your Poster
              </h2>

              <div className="space-y-6">
                {/* Poster Type Selection */}
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Poster Type
                  </h3>
                  <div className="mt-2 grid grid-cols-2 gap-3">
                    <button
                      onClick={() => handlePosterTypeChange("onboarding")}
                      className={`flex items-center justify-center px-4 py-3 border rounded-md ${
                        posterType === "onboarding"
                          ? "border-blue-600 bg-blue-50 text-blue-700"
                          : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <Users className="h-5 w-5 mr-2" />
                      <span>Employee Onboarding</span>
                    </button>

                    <button
                      onClick={() => handlePosterTypeChange("birthday")}
                      className={`flex items-center justify-center px-4 py-3 border rounded-md ${
                        posterType === "birthday"
                          ? "border-blue-600 bg-blue-50 text-blue-700"
                          : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <Gift className="h-5 w-5 mr-2" />
                      <span>Birthday Greeting</span>
                    </button>

                    <button
                      onClick={() => handlePosterTypeChange("anniversary")}
                      className={`flex items-center justify-center px-4 py-3 border rounded-md ${
                        posterType === "anniversary"
                          ? "border-blue-600 bg-blue-50 text-blue-700"
                          : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <Award className="h-5 w-5 mr-2" />
                      <span>Work Anniversary</span>
                    </button>

                    <button
                      onClick={() => handlePosterTypeChange("announcement")}
                      className={`flex items-center justify-center px-4 py-3 border rounded-md ${
                        posterType === "announcement"
                          ? "border-blue-600 bg-blue-50 text-blue-700"
                          : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <Megaphone className="h-5 w-5 mr-2" />
                      <span>Company Announcement</span>
                    </button>
                  </div>
                </div>

                {/* Poster Content */}
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Poster Content
                  </h3>

                  <div className="mt-2 space-y-4">
                    <div>
                      <label
                        htmlFor="title"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Title
                      </label>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        value={posterData.title}
                        onChange={handlePosterDataChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={3}
                        value={posterData.message}
                        onChange={handlePosterDataChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Generate Button */}
                <div className="pt-4">
                  <button
                    onClick={generatePoster}
                    disabled={generatingPoster}
                    className={`w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                      generatingPoster
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700"
                    }`}
                  >
                    {generatingPoster ? (
                      <span className="flex items-center">
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Generating Poster...
                      </span>
                    ) : (
                      "Generate Poster"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Generated Poster */}
        {step === 3 && brandIdentity && posterGenerated && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">
              Your Generated Poster
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Poster Preview */}
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-3">
                  Poster Preview
                </h3>

                <div className="border border-gray-200 rounded-lg overflow-hidden shadow-lg">
                  {/* This is a simulated poster based on the brand identity and poster data */}
                  <div
                    className="aspect-[3/4] relative"
                    style={{
                      backgroundColor: brandIdentity.primaryColors[0],
                      backgroundImage: `linear-gradient(135deg, ${brandIdentity.primaryColors[0]} 0%, ${brandIdentity.primaryColors[1]} 100%)`,
                    }}
                  >
                    {/* Logo */}
                    {brandIdentity.logoUrl && (
                      <div className="absolute top-6 left-6 h-16 w-16  p-2 ">
                        <img
                          src={brandIdentity.logoUrl}
                          alt="Brand Logo"
                          className="h-full w-full object-contain rounded-full"
                        />
                      </div>
                    )}

                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                      <div
                        className="bg-white/90 backdrop-blur-sm rounded-xl p-8 shadow-xl max-w-md"
                        style={{
                          borderLeft: `6px solid ${brandIdentity.secondaryColors[0]}`,
                          borderRight: `6px solid ${brandIdentity.secondaryColors[1]}`,
                        }}
                      >
                        <h2
                          className="text-3xl font-bold mb-4"
                          style={{ color: brandIdentity.primaryColors[0] }}
                        >
                          {posterData.title}
                        </h2>

                        <p className="text-gray-700 text-lg mb-6">
                          {posterData.message}
                        </p>

                        <div className="text-sm text-gray-500 font-medium">
                          {brandIdentity.brandName}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Poster Details */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">
                    Design Rationale
                  </h3>
                  <div className="bg-gray-50 rounded-md p-4 text-sm text-gray-700">
                    <p className="mb-3">
                      This poster design leverages the brand identity elements
                      extracted from your collateral:
                    </p>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>
                        <strong>Color Palette:</strong> The Primary brand colors
                        create a gradient background that establishes brand
                        recognition, while the secondary colors are used as
                        accent elements.
                      </li>
                      <li>
                        <strong>Typography:</strong> The font hierarchy
                        maintains the brand's typographic style, with the
                        primary font used for headings and the secondary font
                        for body text.
                      </li>
                      <li>
                        <strong>Logo Placement:</strong> The logo is positioned
                        prominently but not overwhelmingly, maintaining brand
                        presence while allowing the message to take center
                        stage.
                      </li>
                      <li>
                        <strong>Layout:</strong> The clean, centered layout with
                        ample white space creates a professional and modern
                        aesthetic that aligns with contemporary design
                        principles.
                      </li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">
                    Download Options
                  </h3>
                  <div className="space-y-3">
                    <button className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
                      Download as PNG
                    </button>
                    <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                      Download as PDF
                    </button>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">
                    Editable Source
                  </h3>
                  <div className="border border-gray-300 rounded-md p-4 bg-gray-50">
                    <p className="text-sm text-gray-600 mb-3">
                      Access the editable version of this poster through one of
                      these platforms:
                    </p>
                    <div className="space-y-2">
                      <a
                        href="#"
                        className="block text-blue-600 hover:text-blue-800 text-sm"
                      >
                        Open in Figma (Editable Template)
                      </a>
                      <a
                        href="#"
                        className="block text-blue-600 hover:text-blue-800 text-sm"
                      >
                        Open in Canva (Editable Template)
                      </a>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    onClick={resetApp}
                    className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    Create Another Poster
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
