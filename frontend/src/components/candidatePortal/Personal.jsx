import { useEffect, useState } from "react";
import { updateProfileByToken } from "../../api/candidatePortal.api";

export default function Personal({
  sidebarOpen,
  setSidebarOpen,
  candidate,
  token
}) {

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const [candidateProfileEntity, setCandidateProfileEntity] = useState({
    currentCompany: "",
    totalExperience: 0,
    skills: [],
    education: {}
  });

  useEffect(() => {
    if (candidate) {
      setCandidateProfileEntity({
        currentCompany: candidate.currentCompany || "",
        totalExperience: candidate.totalExperience || 0,
        skills: candidate.skills || [],
        education: candidate.education || {}
      });
    }
  }, [candidate]);

  const handleSaveProfile = async () => {
    try {
      setIsSaving(true);

      const updated = await updateProfileByToken(token, {
        totalExperience: candidateProfileEntity.totalExperience,
        skills: candidateProfileEntity.skills,
        education: candidateProfileEntity.education,
        currentCompany: candidateProfileEntity.currentCompany
      });

      setCandidateProfileEntity(updated);
      setIsEditing(false);
      setShowToast(true);

      setTimeout(() => setShowToast(false), 2500);

    } catch (err) {
      console.error("Update failed:", err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      {showToast && (
        <div className="fixed top-5 right-5 bg-emerald-600 text-white px-6 py-3 rounded shadow-lg z-[999]">
          Profile Updated Successfully
        </div>
      )}

      {/* OVERLAY */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <div
        className={`fixed inset-y-0 right-0 w-[30rem] bg-white shadow-2xl z-50 transform transition-transform duration-300 overflow-y-auto
        ${sidebarOpen ? "translate-x-0" : "translate-x-full"}`}
      >

        <div className="p-6 border-b">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-slate-800">
              Candidate Profile
            </h2>
            <button
              onClick={() => setSidebarOpen(false)}
              className="text-slate-400 hover:text-slate-700"
            >
              ✖
            </button>
          </div>

          <p className="font-bold text-xl">{candidate?.fullName}</p>
          <p className="text-sm text-slate-500">{candidate?.email}</p>
          <p className="text-sm text-slate-500">{candidate?.phone}</p>
        </div>

        <div className="p-6 space-y-6">

          {/* CURRENT COMPANY */}
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase">
              Current Company
            </label>

            {isEditing ? (
              <input
                type="text"
                value={candidateProfileEntity.currentCompany}
                onChange={(e) =>
                  setCandidateProfileEntity({
                    ...candidateProfileEntity,
                    currentCompany: e.target.value
                  })
                }
                className="mt-2 w-full border p-2 rounded"
              />
            ) : (
              <p className="font-semibold">
                {candidateProfileEntity.currentCompany || "Not Added"}
              </p>
            )}
          </div>

          {/* EXPERIENCE */}
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase">
              Experience
            </label>

            {isEditing ? (
              <input
                type="number"
                step="0.5"
                value={candidateProfileEntity.totalExperience}
                onChange={(e) =>
                  setCandidateProfileEntity({
                    ...candidateProfileEntity,
                    totalExperience: e.target.value
                  })
                }
                className="mt-2 w-full border p-2 rounded"
              />
            ) : (
              <p className="font-semibold">
                {candidateProfileEntity.totalExperience} Years
              </p>
            )}
          </div>

          {/* SKILLS */}
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase">
              Skills
            </label>

            {isEditing ? (
              <input
                type="text"
                value={candidateProfileEntity.skills.join(", ")}
                onChange={(e) =>
                  setCandidateProfileEntity({
                    ...candidateProfileEntity,
                    skills: e.target.value.split(",").map(s => s.trim())
                  })
                }
                className="mt-2 w-full border p-2 rounded"
              />
            ) : (
              <div className="flex flex-wrap gap-2 mt-2">
                {candidateProfileEntity.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-slate-100 text-xs rounded"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* SAVE BUTTON */}
          <button
            disabled={isSaving}
            onClick={() => {
              if (isEditing) handleSaveProfile();
              else setIsEditing(true);
            }}
            className={`w-full py-3 rounded font-bold transition ${
              isEditing
                ? "bg-emerald-600 text-white"
                : "bg-slate-800 text-white"
            } ${isSaving ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {isSaving
              ? "Saving..."
              : isEditing
              ? "Save Changes"
              : "Edit Profile"}
          </button>

          {/* RESUME PREVIEW */}
          {candidate?.resumePdf && (
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase">
                Resume Preview
              </label>
              <div className="mt-3 border rounded overflow-hidden h-[400px]">
                <iframe
                  title="Resume"
                  src={`data:application/pdf;base64,${candidate.resumePdf}`}
                  className="w-full h-full"
                />
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  );
}