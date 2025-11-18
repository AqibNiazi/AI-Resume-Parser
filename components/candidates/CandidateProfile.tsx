import React from 'react';
import { Candidate } from '../../types';
import { XIcon, DocumentTextIcon, CheckCircleIcon, XCircleIcon } from '../icons';

interface CandidateProfileProps {
  candidate: Candidate;
  onClose: () => void;
}

const SkillMatchBar: React.FC<{ skill: string, matched: boolean }> = ({ skill, matched }) => (
    <div className="flex items-center justify-between text-sm">
        <span className={matched ? 'text-foreground' : 'text-muted-foreground'}>{skill}</span>
        {matched ? 
            <CheckCircleIcon className="w-5 h-5 text-green-500" /> : 
            <XCircleIcon className="w-5 h-5 text-red-500" />
        }
    </div>
);


const CandidateProfile: React.FC<CandidateProfileProps> = ({ candidate, onClose }) => {
  const { parsedData, scoringResult } = candidate;

  // This is a placeholder for actual skill matching logic against a job description.
  const matchedSkills = new Set(parsedData?.skills.slice(0, 5) || []);

  if (!parsedData || !scoringResult) return null;

  return (
    <>
      <div onClick={onClose} className="fixed inset-0 bg-black/60 z-40" />
      <div className="fixed top-0 right-0 h-full w-full max-w-2xl bg-card z-50 flex flex-col shadow-2xl">
        <header className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold text-foreground">{parsedData.name}</h2>
            <p className="text-sm text-muted-foreground">{parsedData.email} &bull; {parsedData.phone}</p>
          </div>
          <button onClick={onClose} className="p-1 rounded-full text-muted-foreground hover:bg-muted">
            <XIcon className="w-6 h-6" />
          </button>
        </header>

        <main className="flex-grow p-6 overflow-y-auto space-y-6">
            <section className="p-6 rounded-lg border border-border bg-muted/30">
                <h3 className="text-lg font-semibold text-foreground mb-1">Fit Score: {scoringResult.score}</h3>
                <p className="text-sm text-muted-foreground">{scoringResult.reasoning}</p>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <h3 className="font-semibold text-foreground flex items-center"><CheckCircleIcon className="w-5 h-5 mr-2 text-green-500"/>Strengths</h3>
                    <p className="text-sm text-muted-foreground">{scoringResult.strengths}</p>
                </div>
                <div className="space-y-2">
                    <h3 className="font-semibold text-foreground flex items-center"><XCircleIcon className="w-5 h-5 mr-2 text-red-500"/>Weaknesses</h3>
                    <p className="text-sm text-muted-foreground">{scoringResult.weaknesses}</p>
                </div>
            </div>

            <div className="border-t border-border" />
          
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center"><DocumentTextIcon className="w-5 h-5 mr-2 text-primary"/>Extracted Details</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Skills</h4>
                  <div className="space-y-2">
                    {parsedData.skills.slice(0, 7).map(skill => (
                        <SkillMatchBar key={skill} skill={skill} matched={matchedSkills.has(skill)} />
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Experience</h4>
                  <ul className="space-y-3">
                    {parsedData.experience.map((exp, i) => (
                      <li key={i} className="text-sm">
                        <p className="font-medium text-foreground">{exp.title}</p>
                        <p className="text-muted-foreground">{exp.company} &bull; {exp.duration}</p>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Education</h4>
                   <ul className="space-y-3">
                    {parsedData.education.map((edu, i) => (
                      <li key={i} className="text-sm">
                        <p className="font-medium text-foreground">{edu.degree}</p>
                        <p className="text-muted-foreground">{edu.institution} &bull; {edu.year}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
        </main>
      </div>
    </>
  );
};

export default CandidateProfile;
