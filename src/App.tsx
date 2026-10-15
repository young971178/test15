import React, { useState } from 'react';
import {
  ShieldCheck,
  Info,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  FileSpreadsheet,
  Clock,
  Target,
  Calendar,
  CheckCircle2,
  User,
  ExternalLink
} from 'lucide-react';

interface HeaderNoticeProps {
  examinee?: {
    name: string;
    jobGroup: '제조직군' | '비제조직군';
  };
  currentAttempt?: number;
  maxAttempts?: number;
  onSetAttempt?: (n: number) => void;
}

export const HeaderNotice: React.FC<HeaderNoticeProps> = ({
  examinee = { name: '손흥민', jobGroup: '제조직군' },
  currentAttempt = 1,
  maxAttempts = 5,
  onSetAttempt
}) => {
  const [expanded, setExpanded] = useState(true);
  const remainingDays = 17;
  const dDayText = `D-${remainingDays}`;
  const remainingAttempts = Math.max(0, maxAttempts - currentAttempt);

  return (
    <header className="bg-slate-900 text-slate-100 border-b border-slate-800 shadow-md">
      {/* Primary Header Title Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-blue-600/20 text-blue-400 rounded-xl border border-blue-500/30">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight text-white">
                GDX 문제해결 역량 평가
              </h1>
              <span className="px-2 py-0.5 text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full">
                LIVE
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              13개 모듈별 역량 검증 • 현업 시나리오 문제 분석 • 데이터 첨부파일 연동 및 실시간 AI 어시스턴트
            </p>
          </div>
        </div>

        {/* Status Badges & Toggle Notice Button */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Examinee Info Badge */}
          <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-900/40 rounded-lg border border-blue-700/60 text-xs">
            <User className="w-4 h-4 text-blue-400" />
            <div className="flex items-center gap-1.5 font-medium">
              <span className="text-slate-300">응시자:</span>
              <span className="text-white font-bold">{examinee.name}</span>
              <span className="text-slate-400">|</span>
              <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                examinee.jobGroup === '제조직군'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
              }`}>
                {examinee.jobGroup}
              </span>
            </div>
          </div>

          {/* 남은 응시기간 Badge */}
          <div className="flex items-center gap-2 px-3 py-1.5 bg-rose-950/60 rounded-lg border border-rose-500/50 text-xs">
            <Calendar className="w-3.5 h-3.5 text-rose-400" />
            <span className="text-slate-300 font-medium">남은 응시기간:</span>
            <span className="px-1.5 py-0.2 bg-rose-500/30 text-rose-200 font-black rounded border border-rose-400/40">
              {dDayText}
            </span>
          </div>

          {/* 남은 응시가능 횟수 Badge */}
          <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-950/60 rounded-lg border border-emerald-500/50 text-xs">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-slate-300 font-medium">남은 응시기회:</span>
            <span className="text-emerald-200 font-bold">
              현재 <span className="text-amber-300 font-extrabold">{currentAttempt}회</span> 응시 중
              <span className="text-emerald-300 font-extrabold ml-1">({remainingAttempts}회 남음)</span>
            </span>
          </div>

          <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 bg-slate-800/80 rounded-lg border border-slate-700 text-xs">
            <Clock className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-slate-300 font-medium">응시제한시간 60분</span>
          </div>

          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors shadow-xs"
          >
            <Info className="w-3.5 h-3.5" />
            {expanded ? '시험 안내 접기' : '시험 안내 보기'}
            {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Expandable Notice Panel */}
      {expanded && (
        <div className="bg-slate-800/90 border-t border-slate-700/80 px-4 sm:px-6 lg:px-8 py-4 animate-in slide-in-from-top-2 duration-200">
          <div className="max-w-7xl mx-auto text-xs bg-slate-900/80 p-4 rounded-xl border border-slate-700/80 shadow-inner space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-2.5">
              <div className="flex items-center gap-2 font-bold text-blue-300 text-sm">
                <Target className="w-4 h-4 text-blue-400" />
                <span>■ 시험 안내 및 유의사항</span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-slate-400">
                <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
                <span>응시 전 아래 유의사항을 반드시 숙지하시기 바랍니다.</span>
              </div>
            </div>

            <ol className="space-y-2 text-slate-200 list-none leading-relaxed font-normal pt-1">
              <li className="flex items-start gap-2">
                <span className="font-semibold text-blue-400 shrink-0">1.</span>
                <span>아래에 제시된 시나리오 상황과 주어진 데이터를 바탕으로 문제를 정의하세요.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-semibold text-blue-400 shrink-0">2.</span>
                <span>생성형 AI 를 이용하여 데이터를 분석하고, 문제 상황에 대한 해결책을 제시하세요.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-semibold text-blue-400 shrink-0">3.</span>
                <span>생성형 AI 에 입력 된 프롬프트와 제공된 답변 및 최종 작성하신 답안 모두 평가의 대상이 됩니다.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-semibold text-blue-400 shrink-0">4.</span>
                <span>제출하고자 하는 첨부자료가 있다면 첨부하기 기능을 활용하세요.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-semibold text-blue-400 shrink-0">5.</span>
                <span>시험시간은 60분입니다. 60분이 경과 되면 더 이상 답안 작성이 불가하며 현재까지 입력된 내용은 자동으로 저장되어 제출됩니다.</span>
              </li>
            </ol>
          </div>
        </div>
      )}
    </header>
  );
};
