import InquiryForm from './InquiryForm';
import { Award, Music, BookOpen, HelpCircle } from 'lucide-react';

export default function PublicInquiryPage() {
  const highlights = [
    {
      icon: Award,
      title: 'Scholarships',
      desc: 'Merit and need-based financial aid programs.',
      color: 'text-amber-600 bg-amber-50 border-amber-100',
    },
    {
      icon: BookOpen,
      title: 'Admissions',
      desc: 'Guidance on curriculums and application cycles.',
      color: 'text-indigo-600 bg-indigo-50 border-indigo-100',
    },
    {
      icon: Music,
      title: 'Concerts & Events',
      desc: 'Inter-school student talent competitions.',
      color: 'text-emerald-600 bg-emerald-50 border-emerald-100',
    },
    {
      icon: HelpCircle,
      title: 'General Support',
      desc: 'Direct consultation with our admissions desk.',
      color: 'text-cyan-600 bg-cyan-50 border-cyan-100',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-10 py-4">
      {/* Hero Header */}
      <div className="text-center space-y-3">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          EdTech Inquiry & Admissions Portal
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
          Connecting students, parents, and institutions with educational opportunities, scholarships, and skill development programs.
        </p>
      </div>

      {/* Category Info Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        {highlights.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="bg-white border border-slate-200 rounded-xl p-3.5 sm:p-4 text-left shadow-xs flex flex-col justify-between"
            >
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center border mb-2.5 ${item.color}`}
              >
                <Icon className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-800">{item.title}</h4>
                <p className="text-xs text-slate-500 mt-0.5 leading-snug">{item.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Inquiry Form Component */}
      <InquiryForm />
    </div>
  );
}
