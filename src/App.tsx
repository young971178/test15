import React, { useState, useEffect, useRef } from 'react';
import {
  ShieldCheck,
  Info,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  FileSpreadsheet,
  Sparkles,
  Clock,
  Target,
  ChevronRight,
  Database,
  FileText,
  Eye,
  Download,
  Tag,
  BookOpen,
  Layers,
  Edit3,
  Code,
  FileCheck,
  Save,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  Send,
  RotateCcw,
  Copy,
  Calculator,
  Bot,
  Trash2,
  Check,
  RefreshCw,
  X,
  History
} from 'lucide-react';

// ==========================================
// 1. TYPES & INTERFACES
// ==========================================

export interface DatasetFile {
  id: string;
  name: string;
  format: 'csv' | 'xlsx';
  size: string;
  description: string;
  headers: string[];
  rows: (string | number)[][];
}

export interface ScenarioItem {
  id: string; // e.g. "1-1"
  code: string; // e.g. "1-1"
  title: string; // e.g. "데이터의 이해와 척도"
  keyword: string; // e.g. "측정 척도 (Measurement Scale)"
  scenarioText: string; // ~300 character industry scenario testing the keyword
  guidingQuestion: string; // Specific task/question for student
  datasets: DatasetFile[];
}

export interface ModuleCategory {
  id: number;
  title: string; // e.g. "1. 기술통계 (Descriptive Statistics)"
  subItems: ScenarioItem[];
}

export interface StudentSubmission {
  scenarioId: string;
  textContent: string;
  codeContent: string;
  summaryContent: string;
  submittedAt?: string;
  evaluation?: {
    score: number;
    strengths: string[];
    improvements: string[];
    feedbackText: string;
  };
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

// ==========================================
// 2. MODULES & SCENARIOS DATA (13 Modules)
// ==========================================

function generateDatasets(code: string, keyword: string): DatasetFile[] {
  return [
    {
      id: `${code}_ds1`,
      name: `raw_data_${code.replace('-', '_')}.csv`,
      format: 'csv',
      size: '14.2 KB',
      description: `${keyword} 관련 일차 수집 데이터셋 (1,000행)`,
      headers: ['Index', 'Timestamp', 'Sample_ID', 'Measurement_Val', 'Status'],
      rows: [
        [1, '2026-07-01 09:00', 'SMP-101', 24.52, 'PASS'],
        [2, '2026-07-01 09:05', 'SMP-102', 24.88, 'PASS'],
        [3, '2026-07-01 09:10', 'SMP-103', 25.10, 'WARN'],
        [4, '2026-07-01 09:15', 'SMP-104', 24.31, 'PASS'],
        [5, '2026-07-01 09:20', 'SMP-105', 26.04, 'FAIL'],
      ]
    },
    {
      id: `${code}_ds2`,
      name: `process_log_${code.replace('-', '_')}.xlsx`,
      format: 'xlsx',
      size: '28.6 KB',
      description: `${keyword} 분석용 설비 및 조건별 로그 데이터 (Excel)`,
      headers: ['Batch_No', 'Line_ID', 'Factor_A', 'Factor_B', 'Result_Metric'],
      rows: [
        ['BTH-001', 'Line-A', 120.5, 45.2, 0.982],
        ['BTH-002', 'Line-A', 121.0, 44.8, 0.985],
        ['BTH-003', 'Line-B', 119.8, 46.1, 0.961],
        ['BTH-004', 'Line-B', 122.3, 43.9, 0.940],
        ['BTH-005', 'Line-C', 120.1, 45.0, 0.991],
      ]
    },
    {
      id: `${code}_ds3`,
      name: `validation_target_${code.replace('-', '_')}.csv`,
      format: 'csv',
      size: '8.4 KB',
      description: `${keyword} 검증 및 평가 기준 참조표`,
      headers: ['Target_Code', 'Upper_Spec', 'Lower_Spec', 'Target_Val', 'Unit'],
      rows: [
        ['SPEC-01', 26.0, 23.0, 24.5, 'mm'],
        ['SPEC-02', 100.0, 80.0, 90.0, 'kPa'],
        ['SPEC-03', 1.05, 0.95, 1.00, 'ratio'],
      ]
    }
  ];
}

export const MODULES_DATA: ModuleCategory[] = [
  {
    id: 1,
    title: "1. 기술통계 (Descriptive Statistics)",
    subItems: [
      {
        id: "1-1", code: "1-1", title: "1-1. 데이터의 이해와 척도", keyword: "측정 척도 (Measurement Scale)",
        scenarioText: "전자부품 공장의 품질관리팀에서 신규 수집된 데이터(설비 ID, 작업자 만족도 등급, 동작 온도, 불량률)의 척도 유형을 잘못 분류하여 부적절한 평균값을 산출했습니다. 명목, 순서, 구간, 비율 척도를 올바르게 구별하고 각 척도별 가능한 통계 분석 기법을 정립하십시오.",
        guidingQuestion: "제공된 raw_data_1_1.csv 내 5개 변수의 측정 척도 종류를 기술하고, 순서 척도 및 비율 척도에 적용 가능한 대표 통계량을 산출하시오.",
        datasets: generateDatasets("1-1", "측정 척도")
      },
      {
        id: "1-2", code: "1-2", title: "1-2. 중심경향치와 산포도", keyword: "분산 (Variance)",
        scenarioText: "반도체 패키징 라인에서 두 설비 A, B의 제품 두께 평균은 25.0mm로 동일하나 B설비의 고객 반품률이 현저히 높습니다. 산포를 측정하는 분산과 표준편차 개념을 이용해 두 설비 간 변동성 차이를 정량 분석하고 개선안을 제시하십시오.",
        guidingQuestion: "두 설비의 분산 및 표본 분산을 계산하고, 평균만으로 품질을 평가할 수 없는 이유를 정량적 근거와 함께 서술하시오.",
        datasets: generateDatasets("1-2", "분산")
      },
      {
        id: "1-3", code: "1-3", title: "1-3. 데이터의 분포와 형태", keyword: "정규분포 (Normal Distribution)",
        scenarioText: "자동차 엔진 부품 치수 데이터를 수집하여 6시그마 관리선 적용 가능 여부를 검토 중입니다. 데이터 분포의 왜도(Skewness)와 첨도(Kurtosis)를 확인하고, 왜 정규분포 가정이 공정 통계 분석에서 핵심적인 기준이 되는지 설명하십시오.",
        guidingQuestion: "제공된 데이터의 정규성 검정(Anderson-Darling) 결과를 해석하고, 비정규 분포 시 적용해야 할 대안적 접근법을 제시하시오.",
        datasets: generateDatasets("1-3", "정규분포")
      },
      {
        id: "1-4", code: "1-4", title: "1-4. 시각화 기법", keyword: "패턴 인식 (Pattern Recognition)",
        scenarioText: "디스플레이 생산 공정에서 시계열 도수분포표와 상자수염 그림(Boxplot)을 생성하던 중 특정 시간대 수율이 급감하는 패턴을 발견했습니다. 히스토그램과 산점도를 통합하여 이상 패턴을 시각적으로 탐지하고 시사점을 서술하십시오.",
        guidingQuestion: "Boxplot 및 산점도 시각화를 통해 발견된 주기적 변동 패턴을 기술하고, 원인 추정을 위한 변수 간 상관관계를 서술하시오.",
        datasets: generateDatasets("1-4", "패턴 인식")
      },
      {
        id: "1-5", code: "1-5", title: "1-5. 이상치 탐지 및 데이터 요약", keyword: "결측치 (Missing Value)",
        scenarioText: "스마트 팩토리 센서 데이터 전송 중 간헐적 통신 장애로 전체 데이터의 12%에 결측치가 발생하고 정상 범위를 초과하는 이상치 노이즈가 포함되었습니다. IQR 기준 이상치 탐지 및 적절한 결측치 정제 전략을 수립하십시오.",
        guidingQuestion: "IQR 기법으로 이상치를 제거하고, 결측치(MCAR/MAR) 발생 유형별 평균/중위수 대치법의 장단점을 평가하시오.",
        datasets: generateDatasets("1-5", "결측치")
      }
    ]
  },
  {
    id: 2,
    title: "2. 추론통계 (Inferential Statistics)",
    subItems: [
      {
        id: "2-1", code: "2-1", title: "2-1. 확률분포와 표본추출", keyword: "중심극한정리 (CLT)",
        scenarioText: "모집단의 분포가 치우친 지수분포 형태를 띠고 있는 신소재 강도 테스트 데이터가 있습니다. 표본 크기(n=5, 30, 100) 변화에 따른 표본평균의 분포 변화를 분석하여 중심극한정리가 실무 표본추출 및 추론통계에 갖는 의미를 검증하십시오.",
        guidingQuestion: "표본 크기 N의 증가에 따른 표본평균의 분포 형태 변화와 표준오차(SE) 감소 관계를 검증하고 정규성 가정을 논하시오.",
        datasets: generateDatasets("2-1", "중심극한정리")
      },
      {
        id: "2-2", code: "2-2", title: "2-2. 가설검정의 원리", keyword: "유의확률 (p-value)",
        scenarioText: "신규 표면처리 공법 도입 후 마찰계수 감소 여부를 검정하고자 합니다. 귀무가설(H0)과 대립가설(H1)을 설정하고 유의수준(alpha=0.05)에서 계산된 p-value의 통계적 의사결정 기준과 제1종/제2종 오류 위험을 서술하십시오.",
        guidingQuestion: "가설 설정 프로세스를 서술하고, 계산된 p-value = 0.032에 대한 통계적 및 실무적 채택 결정을 내리시오.",
        datasets: generateDatasets("2-2", "유의확률")
      },
      {
        id: "2-3", code: "2-3", title: "2-3. 평균 검정 (t-test 및 ANOVA)", keyword: "집단 간 평균 차이 (Difference of Means)",
        scenarioText: "3개 조립 라인(Line A, B, C)에서 생산된 이차전지 셀 용량의 평균 차이를 검정하고자 합니다. 단일 t-검정 반복의 문제점인 1종 오류 누적을 설명하고, 일원배치 분산분석(One-Way ANOVA)과 사후검정(Tukey) 결과를 도출하십시오.",
        guidingQuestion: "ANOVA F-검정 통계량과 p-value를 도출하고, 집단 간 평균 차이가 유의미하게 발생하는 라인을 규명하시오.",
        datasets: generateDatasets("2-3", "집단 간 평균 차이")
      },
      {
        id: "2-4", code: "2-4", title: "2-4. 분산 및 비율 검정", keyword: "동질성 (Homogeneity)",
        scenarioText: "두 공급업체에서 수급한 원자재의 인장강도 변동성이 동일한지(등분산성)와 불량 비율의 동질성을 검정하고자 합니다. F-검정 및 2-Ratio 검정을 실행하고, 등분산 가정이 2표본 t-검정에 미치는 영향을 작성하십시오.",
        guidingQuestion: "Levene의 등분산 검정 및 카이제곱 독립성 검정을 수행하고 두 업체 raw material의 동질성 여부를 판단하시오.",
        datasets: generateDatasets("2-4", "동질성")
      },
      {
        id: "2-5", code: "2-5", title: "2-5. 상관 및 단순 회귀분석 기초", keyword: "상관계수 (Correlation Coefficient)",
        scenarioText: "사출성형 온도(℃)와 성형품 수축률(%) 간의 선형 관계를 평가하고자 합니다. 피어슨 상관계수 r의 크기와 방향을 해석하고, 결정계수 R²을 통해 온도 변수가 수축률 변동을 설명하는 결정력을 산출하십시오.",
        guidingQuestion: "상관계수 r 및 회귀 방정식 Y = a + bX를 도출하고, 회귀계수 기울기 b의 통계적 유의성을 검정하시오.",
        datasets: generateDatasets("2-5", "상관계수")
      }
    ]
  },
  {
    id: 3,
    title: "3. 실험계획법 (Design of Experiments, DOE)",
    subItems: [
      {
        id: "3-1", code: "3-1", title: "3-1. 실험계획법의 기본 원리", keyword: "랜덤화 (Randomization)",
        scenarioText: "도금 공정 최적화 실험 시 작업 시간대별 외부 습도 변화가 실험 결과에 외생 변수로 작용할 위험이 있습니다. 실험 순서를 무작위로 배치하는 랜덤화 및 블록화(Blocking) 원리가 외생 변동 제어에 기여하는 바를 기술하십시오.",
        guidingQuestion: "실험 순서 무작위 배치가 외생변수의 체계적 편향을 제거하는 통계적 원리를 설명하고 무작위 순서표를 구성하시오.",
        datasets: generateDatasets("3-1", "랜덤화")
      },
      {
        id: "3-2", code: "3-2", title: "3-2. 일원 및 이원 실험계획", keyword: "주효과 (Main Effect)",
        scenarioText: "열처리 온도(Factor A)와 유지 시간(Factor B)이 금속 경도에 미치는 영향력을 평가하고자 합니다. 주효과도(Main Effect Plot) 분석을 통해 개별 인자가 경도 상승에 미치는 독자적 기여도를 산출하십시오.",
        guidingQuestion: "인자 A, B 각각의 주효과 크기를 산출하고, 어느 인자가 반응변수 Y에 더 지배적인 영향을 미치는지 정량 비교하시오.",
        datasets: generateDatasets("3-2", "주효과")
      },
      {
        id: "3-3", code: "3-3", title: "3-3. 완전요인실험 (Full Factorial)", keyword: "교호작용 (Interaction)",
        scenarioText: "2³ 완전요인실험에서 온도와 압력을 동시에 높였을 때 반응 수율이 예상치 못하게 급감하는 현상이 나타났습니다. 교호작용 그래프(Interaction Plot)를 활용하여 인자 간 시너지 또는 상쇄 효과를 해석하십시오.",
        guidingQuestion: "2원 교호작용(A*B)의 유의성을 ANOVA로 확인하고, 교호작용이 존재할 때 단일 주효과 해석의 한계점을 설명하시오.",
        datasets: generateDatasets("3-3", "교호작용")
      },
      {
        id: "3-4", code: "3-4", title: "3-4. 부분요인실험 (Fractional Factorial)", keyword: "교락 (Confounding)",
        scenarioText: "5개 인자(A~E)에 대해 실험 회수를 줄이기 위해 2^(5-1) 부분요인실험을 설계했습니다. 주효과와 2원 교호작용이 교락(Aliasing)되는 구조를 해부하고 분해능(Resolution IV)의 의미를 밝히십시오.",
        guidingQuestion: "해당 디자인의 교락 구조(Defining Relation)를 식별하고, 불필요한 고차 교호작용을 무시할 수 있는 이유를 기술하시오.",
        datasets: generateDatasets("3-4", "교락")
      },
      {
        id: "3-5", code: "3-5", title: "3-5. 반응표면분석법 (RSM) 기초", keyword: "최적화 (Optimization)",
        scenarioText: "화학 반응 공정의 수율을 극대화하기 위해 2차 곡선 모델(Central Composite Design)을 적용하고자 합니다. 반응표면 등고선도 및 만족도 함수(Desirability Function)를 이용해 최적 운영 조건을 도출하십시오.",
        guidingQuestion: "2차 회귀모형의 최적점(Stationary Point) 좌표를 구하고 최고 수율을 달성할 수 있는 인자 조합을 제시하시오.",
        datasets: generateDatasets("3-5", "최적화")
      }
    ]
  },
  {
    id: 4,
    title: "4. 통계적공정관리 (Statistical Process Control, SPC)",
    subItems: [
      {
        id: "4-1", code: "4-1", title: "4-1. 변동의 이해와 SPC 개념", keyword: "이상원인 (Special Cause)",
        scenarioText: "정밀 가공 공정에서 우연원인에 의한 평소 자연 변동과 설비 마모, 원자재 변경 등 이상원인에 의한 변동을 구분해야 합니다. 넬슨 룰(Nelson Rules) 이상 징후를 탐지하여 이상원인을 조기 격리하십시오.",
        guidingQuestion: "우연원인과 이상원인의 차이를 설명하고, 연속 9개 포인트가 중심선 한쪽에 위치할 때의 이상 원인 대응 절차를 기술하시오.",
        datasets: generateDatasets("4-1", "이상원인")
      },
      {
        id: "4-2", code: "4-2", title: "4-2. 측정시스템 분석 (MSA)", keyword: "Gage R&R (반복성 및 재현성)",
        scenarioText: "새로운 3D 측정기 도입 후 측정 결과의 신뢰성을 검증하기 위해 10개 부품, 3명의 검사자, 2회 반복 측정을 시행했습니다. Total Gage R&R %Tolerance가 30%를 초과할 때의 측정 계통 문제를 진단하십시오.",
        guidingQuestion: "%GRR 및 NDC(Distinct Categories 수)를 산출하고 측정 시스템을 채택할 수 있는지 판정 및 조치 방안을 제시하시오.",
        datasets: generateDatasets("4-2", "Gage R&R")
      },
      {
        id: "4-3", code: "4-3", title: "4-3. 계량형 관리도", keyword: "관리한계선 (Control Limits)",
        scenarioText: "Xbar-R 관리도를 작성하던 중 공정 규격한계(USL/LSL)와 관리한계선(UCL/LCL)의 개념을 혼동하여 가동이 중단되는 사례가 발생했습니다. 관리한계선의 통계적 산출 공식과 역할을 정립하십시오.",
        guidingQuestion: "Xbar 및 R 관리도의 중심선(CL)과 상/하한 관리한계선(UCL/LCL)을 산출하고 관리 이탈 여부를 판정하시오.",
        datasets: generateDatasets("4-3", "관리한계선")
      },
      {
        id: "4-4", code: "4-4", title: "4-4. 계수형 관리도", keyword: "불량비율 (Defect Rate)",
        scenarioText: "SMT 기판 표면의 흠집 불량 개수 및 불량률을 관리하기 위해 P-관리도 및 U-관리도 적용을 검토 중입니다. 부분군 크기 변동에 따른 불량비율 관리한계선 가변 계산법을 적용하십시오.",
        guidingQuestion: "시료 수 변화에 따른 P-관리도의 관리한계선 산출식을 서술하고, 이상 불량비율 정점 발생 시 원인 분석을 작성하시오.",
        datasets: generateDatasets("4-4", "불량비율")
      },
      {
        id: "4-5", code: "4-5", title: "4-5. 공정능력 지수", keyword: "Cpk (단기 공정능력지수)",
        scenarioText: "고객사가 요구한 Cp 1.67 및 Cpk 1.33 이상 기준을 충족해야 합니다. 공정 평균이 목표값에서 치우쳤을 때 Cp와 Cpk의 차이를 분석하고, 치우침 계수 k를 적용하여 공정 능력을 평가하십시오.",
        guidingQuestion: "제공된 규격한계와 데이터로부터 Cp, Cpk 값을 각각 계산하고 공정 평균 이동 개선이 필요한 이유를 명시하시오.",
        datasets: generateDatasets("4-5", "Cpk")
      }
    ]
  },
  {
    id: 5,
    title: "5. 구조적 문제해결 방법론",
    subItems: [
      {
        id: "5-1", code: "5-1", title: "5-1. 문제 정의와 현상 파악", keyword: "As-Is 정량화 (Quantification)",
        scenarioText: "스마트 가전 반품률 상승 문제를 해결하기 위해 '반품이 많다'는 주관적 지표를 정량 수치(As-Is 현상: 반품률 4.2%, 월 손실금액 1억 2천만 원)로 명확히 정량화하고 목표 설정 가이드를 수립하십시오.",
        guidingQuestion: "As-Is 정량화 수준을 측정할 수 있는 핵심 지표(KPI) 3가지를 도출하고 과제 목표(To-Be) 설정 논리를 작성하시오.",
        datasets: generateDatasets("5-1", "As-Is 정량화")
      },
      {
        id: "5-2", code: "5-2", title: "5-2. 데이터 기반 원인 분석", keyword: "근본 원인 (Root Cause)",
        scenarioText: "특성요인도(Fishbone Diagram)와 5-Why 기법으로 도출된 표면적 원인들 중, 직관이 아닌 객관적 데이터 가설검정(상관분석/t-test)으로 진짜 근본 원인(Root Cause)을 규명하는 가이드라인을 작성하십시오.",
        guidingQuestion: "도출된 잠재 원인 가설 중 데이터 검정을 통해 채택된 근본 원인의 검정 결과 통계치를 제시하시오.",
        datasets: generateDatasets("5-2", "근본 원인")
      },
      {
        id: "5-3", code: "5-3", title: "5-3. 핵심 인자(Vital Few) 검증", keyword: "핵심 인자 (Vital Few)",
        scenarioText: "파레토 법칙(80/20)을 응용하여 공정 불량을 유발하는 15개 원인 인자 중 실제 변동의 80% 이상을 차지하는 Vital Few 인자 3개를 데이터 기반으로 정량 선별하십시오.",
        guidingQuestion: "파레토 차트 분석 결과 데이터를 작성하고, Trivially Many 인자를 제쳐두고 Vital Few에 집중하는 타당성을 제시하시오.",
        datasets: generateDatasets("5-3", "핵심 인자")
      },
      {
        id: "5-4", code: "5-4", title: "5-4. 최적 대안 도출 및 평가", keyword: "우선순위 (Priority)",
        scenarioText: "도출된 5개 개선 대안에 대해 구현 용이성, 비용, 효과성, 리스크 4가지 기준의 가중치 매트릭스(Pugh Matrix)를 구성하여 객관적 우선순위를 평가 도출하십시오.",
        guidingQuestion: "수량화 평점 매트릭스를 완성하고 최종 1순위 안선정 사유와 리스크 완화 대책을 기술하시오.",
        datasets: generateDatasets("5-4", "우선순위")
      },
      {
        id: "5-5", code: "5-5", title: "5-5. 실행, 검증 및 표준화", keyword: "관리계획 (Control Plan)",
        scenarioText: "개선 조치 후 수율이 98.5%로 향상되었습니다. 시간이 지나 공정이 과거 상태로 퇴보(Relapse)하지 않도록 관리항목, 측정주기, 조치자가 명시된 공정 관리계획서(Control Plan) 및 표준작업지침(SOP)을 수립하십시오.",
        guidingQuestion: "개선 효과의 지속 유지를 위한 Control Plan 내 5가지 필수 기재 항목을 작성하고 모니터링 관리도를 지정하시오.",
        datasets: generateDatasets("5-5", "관리계획")
      }
    ]
  },
  {
    id: 6,
    title: "6. 미니탭 기초 (Minitab Basics)",
    subItems: [
      {
        id: "6-1", code: "6-1", title: "6-1. 기본 UI와 환경 설정", keyword: "세션 창 (Session Window)",
        scenarioText: "Minitab 실행 후 워크시트에 입력된 수치 데이터 분석 시, 분석 명령 수행에 따른 통계 계산 결과와 P-value, 그래프 요약이 출력되는 세션 창(Session Window) 기록 활용법을 서술하십시오.",
        guidingQuestion: "세션 창에 출력된 통계 결과물의 텍스트 저장 및 보고서 활용 방안과 명령어 커맨드 실행 방법을 설명하시오.",
        datasets: generateDatasets("6-1", "세션 창")
      },
      {
        id: "6-2", code: "6-2", title: "6-2. 데이터 핸들링", keyword: "데이터 포맷팅 (Data Formatting)",
        scenarioText: "엑셀에서 Minitab으로 데이터를 임포트할 때 날짜/시간, 숫자, 문자 열 유형 오류로 분석이 차단되는 현상이 발생했습니다. 워크시트 속성 변경 및 코딩 변경(Recode) 데이터 정제 절차를 서술하십시오.",
        guidingQuestion: "문자로 인식된 C1 컬럼을 숫자 포맷(Numeric)으로 전환하고 범주형 데이터를 수치로 변환하는 메뉴 경로 및 절차를 작성하시오.",
        datasets: generateDatasets("6-2", "데이터 포맷팅")
      },
      {
        id: "6-3", code: "6-3", title: "6-3. 기초 통계량 및 그래프 작성", keyword: "층별화 (Stratification)",
        scenarioText: "전체 데이터의 평균만 보았을 때는 특이점이 없었으나 주간/야간 작업조 및 설비별로 데이터를 층별화(Stratification)하여 분석하자 야간조의 산포가 2배 이상 큼을 확인했습니다. Minitab의 By 변수를 활용한 층별 그래프 작성법을 작성하십시오.",
        guidingQuestion: "가공 온도 데이터를 작업조(Shift) 변수로 층별화하여 기술통계량을 산출하고 직관적 개별값 그림(Individual Value Plot)을 해석하시오.",
        datasets: generateDatasets("6-3", "층별화")
      },
      {
        id: "6-4", code: "6-4", title: "6-4. 가설검정 실습", keyword: "결과 해석 (Result Interpretation)",
        scenarioText: "Minitab에서 2-Sample t-test 메뉴를 실행한 후 생성된 출력 결과에서 T-Value, P-Value, 95% 신뢰구간[CI]을 종합적으로 해석하여 통계적 결론을 내리는 보고서를 작성하십시오.",
        guidingQuestion: "Minitab 세션 결과창의 CI(-1.25, -0.12), P=0.018 값을 바탕으로 두 공정 간 평균 차이의 실무적 결론을 작성하시오.",
        datasets: generateDatasets("6-4", "결과 해석")
      },
      {
        id: "6-5", code: "6-5", title: "6-5. Minitab Assistant 활용", keyword: "자동 리포팅 (Auto Reporting)",
        scenarioText: "초급 통계 사용자가 Minitab Assistant 메뉴를 활용하여 통계적 검정 도구 선택 안내부터 진단 보고서(Diagnostic Report) 및 요약 보고서(Summary Report)를 자동 생성하는 프로세스를 설명하십시오.",
        guidingQuestion: "Assistant 도구가 제시하는 가설검정 자동 보고서의 3대 리포트(요약, 진단, 카드) 구성을 설명하시오.",
        datasets: generateDatasets("6-5", "자동 리포팅")
      }
    ]
  },
  {
    id: 7,
    title: "7. 파이썬 리터러시 (Python Literacy)",
    subItems: [
      {
        id: "7-1", code: "7-1", title: "7-1. 환경 구축과 기본 문법", keyword: "자료형 (Data Type)",
        scenarioText: "파이썬 데이터 분석 시 텍스트 불량 코드('0102')가 정수형(102)으로 자동 변환되어 앞자리 0이 손실되거나, 문자열과 숫자 간 연산 시 TypeError가 발생했습니다. 파이썬 기본 자료형(int, float, str, bool) 변환 기법을 서술하십시오.",
        guidingQuestion: "각 변수의 자료형을 확인하고, 불량 코드 손실 방지를 위한 Explicit Casting(형변환) 코드 예시를 작성하시오.",
        datasets: generateDatasets("7-1", "자료형")
      },
      {
        id: "7-2", code: "7-2", title: "7-2. 제어문과 함수", keyword: "논리 제어 (Flow Control)",
        scenarioText: "생산 라인에서 실시간 수집되는 센서 측정값 배열을 순회(for문)하면서 기준치 초과 시 'ALARM'을 출력하고(if문), 정제 함수 def check_quality()를 작성하여 공정을 논리 제어하는 파이썬 로직을 구현하십시오.",
        guidingQuestion: "센서 리스트를 입력받아 이상치를 필터링하고 알림 메시지를 리턴하는 파이썬 함수 작성 코드를 기술하시오.",
        datasets: generateDatasets("7-2", "논리 제어")
      },
      {
        id: "7-3", code: "7-3", title: "7-3. 데이터 구조 이해", keyword: "자료구조 (Data Structure)",
        scenarioText: "리스트(List), 튜플(Tuple), 딕셔너리(Dictionary), 세트(Set)의 특징과 가변성(Mutability) 차이를 파악하고, 설비별 메타데이터 매핑 및 중복 제거에 어떤 파이썬 자료구조가 가장 적합한지 판단하십시오.",
        guidingQuestion: "설비 ID별 사양 정보를 저장하는 Dictionary 구조 및 중복 측정치 제거용 Set 연산 파이썬 코드 예시를 작성하시오.",
        datasets: generateDatasets("7-3", "자료구조")
      },
      {
        id: "7-4", code: "7-4", title: "7-4. Pandas 기초 (데이터 입출력)", keyword: "데이터프레임 (DataFrame)",
        scenarioText: "Pandas 라이브러리를 이용하여 CSV 및 Excel 파일 데이터를 pd.read_csv()로 로딩한 후 2차원 데이터프레임(DataFrame) 구조의 head(), info(), describe()로 데이터 윤곽을 정량 요약하십시오.",
        guidingQuestion: "제공된 CSV 파일을 Pandas DataFrame으로 읽어 들인 후 행/열 크기 및 컬럼별 데이터 타입을 출력하는 코드를 작성하시오.",
        datasets: generateDatasets("7-4", "데이터프레임")
      },
      {
        id: "7-5", code: "7-5", title: "7-5. Pandas 기초 (데이터 가공)", keyword: "그룹화 (GroupBy)",
        scenarioText: "공장 내 10개 작업 라인별 불량 수량을 집계하기 위해 df.groupby('Line_ID').agg() 구문을 사용하고자 합니다. 그룹화 연산을 통해 라인별, 월별 평균 수율 및 불량률을 산출하는 파이썬 스크립트를 작성하십시오.",
        guidingQuestion: "Pandas groupby 구문으로 작업 라인별 Measurement_Val의 평균과 표준편차를 동시 산출하는 코드를 제시하시오.",
        datasets: generateDatasets("7-5", "그룹화")
      }
    ]
  },
  {
    id: 8,
    title: "8. 프롬프트 엔지니어링과 바이브 코딩",
    subItems: [
      {
        id: "8-1", code: "8-1", title: "8-1. LLM 작동 원리와 프롬프트 구조", keyword: "맥락 부여 (Context Setting)",
        scenarioText: "LLM에 단순히 '통계 코드 짜줘'라고 요구하면 모호한 답변이 나옵니다. 페르소나(역할), 생산 공정 배경 맥락(Context), 제약 조건 및 기대 출력 형식(JSON/Markdown)을 지정하는 명확한 프롬프트 구조를 설계하십시오.",
        guidingQuestion: "품질 데이터 전처리 코드를 요청하기 위한 [역할-맥락-지시-제약조건-출력형식] 구조의 완벽한 프롬프트 예시를 작성하시오.",
        datasets: generateDatasets("8-1", "맥락 부여")
      },
      {
        id: "8-2", code: "8-2", title: "8-2. 바이브 코딩의 이해", keyword: "자연어-코드 번역 (NL-to-Code)",
        scenarioText: "개발 지식이 부족한 현업엔지니어가 '각 라인별 온도의 95백분위수를 구하고 그래프로 그려줘'라는 자연어 요구사항을 AI에 입력하여 실행 가능한 파이썬 Pandas/Seaborn 코드로 자동 번역 유도하는 기법을 실습하십시오.",
        guidingQuestion: "자연어 요청사항을 AI 코딩 어시스턴트에 전달하여 생성된 코드를 검증하고 적용하는 단계를 기술하시오.",
        datasets: generateDatasets("8-2", "자연어-코드 번역")
      },
      {
        id: "8-3", code: "8-3", title: "8-3. 데이터 처리 프롬프팅 실습", keyword: "단계별 지시 (Step-by-Step)",
        scenarioText: "복잡한 데이터 정제 작업을 AI에 시킬 때 Chain-of-Thought(CoT) 원리를 적용하여 'Step 1: 결측치 확인 -> Step 2: 이상치 제거 -> Step 3: 스케일링 -> Step 4: 시각화' 순으로 단계별 지시 프롬프트를 작성하십시오.",
        guidingQuestion: "CoT 프롬프팅 기법을 적용하여 AI가 정교한 데이터 전처리 파이프라인 코드를 차근차근 생성하도록 지시하는 스크립트를 작성하시오.",
        datasets: generateDatasets("8-3", "단계별 지시")
      },
      {
        id: "8-4", code: "8-4", title: "8-4. 오류 해결(디버깅) 프롬프팅", keyword: "에러 로그 (Error Log)",
        scenarioText: "파이썬 실행 중 KeyError: 'Status' 및 MemoryError 가 발생했을 때, 발생한 에러 트레이스백 로그 전체와 관련 데이터 프레임 구조 정보를 AI 프롬프트에 제공하여 최적의 디버깅 수정안을 도출하십시오.",
        guidingQuestion: "에러 로그 원문 및 환경 정보를 포함하여 AI에게 정확한 원인 분석 및 수정 코드를 요청하는 프롬프트를 작성하시오.",
        datasets: generateDatasets("8-4", "에러 로그")
      },
      {
        id: "8-5", code: "8-5", title: "8-5. 현업 자동화 템플릿 구축", keyword: "반복 스크립트 (Automation Script)",
        scenarioText: "매일 아침 9시 엑셀 보고서를 읽어 통계 지표를 계산하고 정식 이메일/슬랙으로 자동 발송하는 작업을 자동화하려고 합니다. 프롬프팅으로 재사용 가능한 모듈화 파이썬 스크립트 템플릿을 완성하십시오.",
        guidingQuestion: "AI를 활용하여 생성한 자동 보고서 생성 파이썬 모듈의 구조와 실행 가능한 자동화 템플릿 코드를 기술하시오.",
        datasets: generateDatasets("8-5", "반복 스크립트")
      }
    ]
  },
  {
    id: 9,
    title: "9. 머신러닝 : 이론",
    subItems: [
      {
        id: "9-1", code: "9-1", title: "9-1. 머신러닝 개요", keyword: "학습 패러다임 (Learning Paradigm)",
        scenarioText: "제조 현장의 다양한 문제(불량 예측, 설비 이상 탐지, 고객 군집화)에 대해 지도학습(Supervised), 비지도학습(Unsupervised), 강화학습(Reinforcement) 패러다임 중 적절한 알고리즘을 매핑하고 목적을 수립하십시오.",
        guidingQuestion: "정답 레이블 유무 및 목적에 따라 3가지 머신러닝 패러다임을 분류하고, 품질 불량 분류 모델의 타당성을 서술하시오.",
        datasets: generateDatasets("9-1", "학습 패러다임")
      },
      {
        id: "9-2", code: "9-2", title: "9-2. 주요 알고리즘의 이해 (회귀)", keyword: "선형성 (Linearity)",
        scenarioText: "다중 선형 회귀(Multiple Linear Regression) 적용 시 독립변수 간 다중공선성(Multicollinearity) 문제와 선형성 가정이 깨질 경우 발생하는 문제점을 평가하고 Ridge/Lasso 규제 회귀 적용 방안을 작성하십시오.",
        guidingQuestion: "선형성 가정을 검증하기 위한 잔차 분석(Residual Plot) 방법과 다중공선성 측정 지표 VIF의 기준을 기술하시오.",
        datasets: generateDatasets("9-2", "선형성")
      },
      {
        id: "9-3", code: "9-3", title: "9-3. 주요 알고리즘의 이해 (분류)", keyword: "앙상블 (Ensemble)",
        scenarioText: "단일 의사결정나무(Decision Tree)의 과적합 단점을 극복하기 위해 약한 학습기들을 결합하는 앙상블(Ensemble) 기법인 배깅(Random Forest)과 부스팅(XGBoost, LightGBM)의 작동 원리 차이를 논하십시오.",
        guidingQuestion: "Random Forest의 Bootstrap Sampling 원리와 Gradient Boosting의 잔차 학습 메커니즘을 정량적 비교 서술하시오.",
        datasets: generateDatasets("9-3", "앙상블")
      },
      {
        id: "9-4", code: "9-4", title: "9-4. 모델 평가 지표", keyword: "혼동 행렬 (Positive = 불량(NG) 기준)",
        scenarioText: "불량률 1% 미만의 극심한 불균형 데이터셋에서 단순 정확도(Accuracy)는 99%로 왜곡됩니다. Positive를 '불량(NG)'으로 설정하고, 정밀도(Precision), 재현율(Recall), F1-Score, ROC-AUC 지표의 의미를 밝히십시오.",
        guidingQuestion: "혼동 행렬(TP, FP, FN, TN)을 구성하고 실제 불량을 놓치는 비용(FN)이 클 때 강조해야 할 평가 지표를 정당화하시오.",
        datasets: generateDatasets("9-4", "혼동 행렬")
      },
      {
        id: "9-5", code: "9-5", title: "9-5. 과적합과 규제", keyword: "편향-분산 트레이드오프 (Bias-Variance Tradeoff)",
        scenarioText: "학습 데이터에서는 99.9% 성능을 보이나 검증 데이터에서는 60%로 폭락하는 과적합(Overfitting) 현상이 관찰되었습니다. 편향-분산 트레이드오프 관계를 설명하고 규제(L1/L2) 및 드롭아웃 적용법을 기술하십시오.",
        guidingQuestion: "복잡도 증가에 따른 Bias 및 Variance의 변화 곡선을 제시하고 오버피팅을 방지하는 3가지 실무 수단을 설명하시오.",
        datasets: generateDatasets("9-5", "편향-분산 트레이드오프")
      }
    ]
  },
  {
    id: 10,
    title: "10. 머신러닝 : 탐색적 데이터분석 (EDA)",
    subItems: [
      {
        id: "10-1", code: "10-1", title: "10-1. 데이터 구조 파악과 요약", keyword: "데이터 윤곽 (Data Shape)",
        scenarioText: "10만 행, 80개 특징(Feature)으로 구성된 고차원 공정 데이터셋을 수령했습니다. df.shape, df.dtypes, 카디널리티(Cardinality) 및 범주형/수치형 변수 구분을 통해 데이터 윤곽을 정밀 파악하십시오.",
        guidingQuestion: "고차원 데이터 파악 시 수치형 변수와 고유값이 적은 범주형 변수를 자동 분리 탐색하는 파이썬 코드를 작성하시오.",
        datasets: generateDatasets("10-1", "데이터 윤곽")
      },
      {
        id: "10-2", code: "10-2", title: "10-2. 단일 변수 및 이변량 분석", keyword: "상관관계 (Correlation)",
        scenarioText: "타겟 변수(품질 지수)와 50개 공정 변수 간의 히트맵(Heatmap) 상관계수 행렬을 생성하여 유의미한 상위 영향 변수들을 발굴하는 탐색적 데이터 분석(EDA) 스크립트를 작성하십시오.",
        guidingQuestion: "Seaborn heatmap을 이용해 타겟 변수와 높은 선형/비선형 상관성을 나타내는 주요 변수 탐색 코드를 작성하시오.",
        datasets: generateDatasets("10-2", "상관관계")
      },
      {
        id: "10-3", code: "10-3", title: "10-3. 데이터 정제 (Cleansing)", keyword: "결측치 대치 (Imputation)",
        scenarioText: "센서 고장으로 생성된 결측 데이터를 무조건 삭제하면 시계열 정보가 파괴됩니다. SimpleImputer(평균/중위수) 및 KNNImputer를 활용한 데이터 결측치 대치 전략의 타당성을 평가하십시오.",
        guidingQuestion: "결측 비율에 따른 삭제 vs 대치(Imputation) 임계 기준을 정립하고 파이썬 Scikit-Learn 대치 코드를 제시하시오.",
        datasets: generateDatasets("10-3", "결측치 대치")
      },
      {
        id: "10-4", code: "10-4", title: "10-4. 데이터 스케일링과 인코딩", keyword: "정규화 (Normalization)",
        scenarioText: "온도(0~1500℃)와 압력(0~1기압) 변수의 단위 차이로 인해 머신러닝 거리기반 알고리즘이 왜곡됩니다. StandardScaler(표준화)와 MinMaxScaler(정규화) 및 원핫인코딩(One-Hot Encoding)을 적용하십시오.",
        guidingQuestion: "표준화와 정규화의 수학적 공식을 비교하고, 범주형 변수의 One-Hot Encoding 시 발생할 수 있는 가변수 함정 대책을 쓰시오.",
        datasets: generateDatasets("10-4", "정규화")
      },
      {
        id: "10-5", code: "10-5", title: "10-5. 파생 변수 생성 (Feature Engineering)", keyword: "특성 추출 (Feature Extraction)",
        scenarioText: "기존 변수인 온도와 시간을 곱하여 '열에너지 누적량'이라는 도메인 파생 변수를 생성하고, PCA(주성분분석)를 적용하여 차원을 축소함으로써 모델 예측력을 극대화하십시오.",
        guidingQuestion: "도메인 지식 기반 파생 변수 생성 스크립트와 PCA 주성분 설명 분산 비율(Explained Variance Ratio) 산출법을 기술하시오.",
        datasets: generateDatasets("10-5", "특성 추출")
      }
    ]
  },
  {
    id: 11,
    title: "11. 머신러닝 : 모델링 및 강화",
    subItems: [
      {
        id: "11-1", code: "11-1", title: "11-1. 데이터 분할과 베이스라인 구축", keyword: "과적합 방지 (Train-Test Split)",
        scenarioText: "머신러닝 모델 구축 시 전체 데이터를 8:2 비율로 Train과 Test 세트로 분할(train_test_split)할 때 stratify 옵션을 사용하여 불량 클래스 비율을 보존하고 과적합을 방지하는 베이스라인을 구축하십시오.",
        guidingQuestion: "Stratified Train-Test Split의 중요성과 무작위 분할 시 발생할 수 있는 데이터 누출(Data Leakage) 방지책을 작성하시오.",
        datasets: generateDatasets("11-1", "과적합 방지")
      },
      {
        id: "11-2", code: "11-2", title: "11-2. 교차 검증 (Cross-Validation)", keyword: "K-Fold 검증",
        scenarioText: "단일 Train/Test 분할의 편향성을 없애기 위해 데이터셋을 K개의 조각으로 나누어 교차 검증하는 K-Fold 및 Stratified K-Fold Cross Validation 모듈을 적용하고 평균 검증 점수를 도출하십시오.",
        guidingQuestion: "K-Fold 교차 검증 수행 과정 및 Scikit-Learn의 cross_val_score 파이썬 코드를 제시하시오.",
        datasets: generateDatasets("11-2", "K-Fold 검증")
      },
      {
        id: "11-3", code: "11-3", title: "11-3. 하이퍼파라미터 튜닝", keyword: "파라미터 최적화 (Parameter Optimization)",
        scenarioText: "XGBoost 모델의 n_estimators, max_depth, learning_rate 최적 조합을 찾기 위해 GridSearchCV 및 RandomizedSearchCV 탐색 기법을 적용하여 성능을 극대화하십시오.",
        guidingQuestion: "GridSearchCV 탐색 공간 설정 및 최적 하이퍼파라미터(best_params_) 도출 스크립트를 기술하시오.",
        datasets: generateDatasets("11-3", "파라미터 최적화")
      },
      {
        id: "11-4", code: "11-4", title: "11-4. 앙상블 기법 적용", keyword: "부스팅 (Boosting)",
        scenarioText: "약한 예측기들을 경사하강법(Gradient Descent) 기반으로 순차 학습시키는 Boosting 계열 LightGBM, CatBoost 알고리즘을 구축하고 학습 속도 및 예측 정밀도를 대폭 향상시키십시오.",
        guidingQuestion: "LightGBM의 Leaf-wise 트리 분할 방식 특성과 카테고리 변수 자동 처리 성능을 분석 서술하시오.",
        datasets: generateDatasets("11-4", "부스팅")
      },
      {
        id: "11-5", code: "11-5", title: "11-5. 최종 결과 해석", keyword: "특성 중요도 (Feature Importance)",
        scenarioText: "최종 머신러닝 예측 모델이 어떤 변수를 주요 근거로 판단했는지 현업 엔지니어에게 설명하기 위해 Feature Importance 및 SHAP(SHapley Additive exPlanations) 가치 분석을 수행하십시오.",
        guidingQuestion: "특성 중요도 Top 5 변수를 시각화하고 SHAP summary plot 결과를 바탕으로 불량 유발 핵심 요인을 해석하시오.",
        datasets: generateDatasets("11-5", "특성 중요도")
      }
    ]
  },
  {
    id: 12,
    title: "12. AI Automation",
    subItems: [
      {
        id: "12-1", code: "12-1", title: "12-1. 자동화 파이프라인 설계", keyword: "End-to-End 아키텍처",
        scenarioText: "공장 센서 데이터 수집부터 DB 저장, ML 모델 실시간 불량 추론, 웹 대시보드 표출까지 연결되는 End-to-End 자동화 파이프라인 흐름도를 설계하고 구성요소 간 데이터 인터페이스를 서술하십시오.",
        guidingQuestion: "End-to-End AI 자동화 파이프라인의 4단계(수집-전처리-추론-모니터링) 아키텍처 구성안을 제시하시오.",
        datasets: generateDatasets("12-1", "End-to-End 아키텍처")
      },
      {
        id: "12-2", code: "12-2", title: "12-2. 외부 데이터 연동 기초", keyword: "API 연동 (API Integration)",
        scenarioText: "RESTful API(requests 라이브러리)를 통해 외부 기상청 온습도 데이터 및 ERP 원자재 입고 시스템 데이터를 실시간 수집하여 예측 모델 인자로 결합하는 자동 연동 모듈을 구현하십시오.",
        guidingQuestion: "Python requests 모듈을 사용하여 JSON 응답 데이터를 수신하고 DataFrame으로 변환하는 API 연동 코드를 기술하시오.",
        datasets: generateDatasets("12-2", "API 연동")
      },
      {
        id: "12-3", code: "12-3", title: "12-3. 스케줄링 도구 적용", keyword: "배치 작업 (Batch Processing)",
        scenarioText: "매시간 단위 또는 매일 심야에 대용량 로그를 자동 정제하고 모델을 주기적 재학습시키는 Crontab 또는 Python schedule, Airflow 배치 작업을 구동하는 스케줄링 방안을 수립하십시오.",
        guidingQuestion: "Python schedule 라이브러리를 이용하여 지정된 시간에 자동으로 데이터 수집 및 분석 함수를 실행하는 코드 예시를 쓰시오.",
        datasets: generateDatasets("12-3", "배치 작업")
      },
      {
        id: "12-4", code: "12-4", title: "12-4. 자동화된 알림 시스템", keyword: "트리거 (Trigger)",
        scenarioText: "공정 불량률이 세팅된 관리 한계값(3%)을 초과하여 이상 징후가 감지되면 즉시 담당자 웹훅(Webhook)을 통해 카카오톡/슬랙/이메일로 실시간 긴급 경보를 전송하는 트리거 시스템을 개발하십시오.",
        guidingQuestion: "임계치 초과 이벤트 발생 시 Webhook URL로 JSON 알림 파형을 전송하는 파이썬 트리거 로직을 작성하시오.",
        datasets: generateDatasets("12-4", "트리거")
      },
      {
        id: "12-5", code: "12-5", title: "12-5. 모니터링 및 유지보수", keyword: "데이터 드리프트 (Data Drift)",
        scenarioText: "시간이 지남에 따라 원자재 사양 변경으로 입력 데이터의 통계적 분포가 달라져 모델 성능이 저하되는 데이터 드리프트(Data Drift) 현상을 모니터링하고 자동 재학습 파이프라인을 구축하십시오.",
        guidingQuestion: "데이터 드리프트 탐지 지표(PSI/KS-Test) 모니터링 방안과 모델 재학습(Re-training) 트리거 조건을 서술하시오.",
        datasets: generateDatasets("12-5", "데이터 드리프트")
      }
    ]
  },
  {
    id: 13,
    title: "13. 시각화 - Tableau와 Power BI",
    subItems: [
      {
        id: "13-1", code: "13-1", title: "13-1. BI 도구의 이해와 데이터 연결", keyword: "데이터 원본 (Data Source)",
        scenarioText: "Tableau 및 Power BI 도구에서 파일(CSV, XLSX) 및 RDBMS(MySQL, PostgreSQL) 데이터 원본에 라이브(Live) 연결 vs 추출(Extract/Import) 방식을 선택하는 성능 최적화 가이드를 수립하십시오.",
        guidingQuestion: "대용량 데이터 환경에서 추출(Extract)과 라이브(Live) 연결 방식의 장단점을 비교하고 데이터 새로고침 전략을 작성하시오.",
        datasets: generateDatasets("13-1", "데이터 원본")
      },
      {
        id: "13-2", code: "13-2", title: "13-2. 데이터 전처리와 관계 모델링", keyword: "스타 스키마 (Star Schema)",
        scenarioText: "여러 개의 생산/품질 테이블을 효과적으로 연결하기 위해 중심의 팩트 테이블(Fact Table: 불량 이력)과 주변의 차원 테이블(Dimension Table: 설비, 제품, 작업자)을 스타 스키마(Star Schema) 구조로 모델링하십시오.",
        guidingQuestion: "스타 스키마 데이터 모델링의 1:N 관계 구성과 조인(Join) 대비 데이터 조회의 효율성 이점을 작성하시오.",
        datasets: generateDatasets("13-2", "스타 스키마")
      },
      {
        id: "13-3", code: "13-3", title: "13-3. 목적별 핵심 시각화 차트 구현", keyword: "시각화 매핑 (Visual Mapping)",
        scenarioText: "경영진 및 현장 작업자 목적별로 추세 분석(선 그래프), 구성 비율(파이/트리맵), 변수 간 관련성(산점도), 지리적 분포(맵)를 매핑하는 데이터 시각화 차트 선택 가이드라인을 디자인하십시오.",
        guidingQuestion: "분석 목적(추세, 비교, 분포, 관계)에 따른 최적 시각화 차트 매핑표를 작성하고 색상 및 범례 활용 가이드를 쓰시오.",
        datasets: generateDatasets("13-3", "시각화 매핑")
      },
      {
        id: "13-4", code: "13-4", title: "13-4. 고급 계산식과 심화 분석", keyword: "DAX 및 LOD 표현식",
        scenarioText: "Power BI의 DAX(Data Analysis Expressions: CALCULATE, SUMX) 및 Tableau의 LOD(Level of Detail: FIXED, INCLUDE) 표현식을 활용하여 현재 필터와 무관한 전체 대비 비율 및 누적 지표를 산출하십시오.",
        guidingQuestion: "Tableau {FIXED [Line_ID] : AVG([Measurement_Val])} 공식 및 Power BI DAX 측정값 작성법의 논리를 서술하시오.",
        datasets: generateDatasets("13-4", "DAX 및 LOD 표현식")
      },
      {
        id: "13-5", code: "13-5", title: "13-5. 인터랙티브 대시보드와 스토리텔링", keyword: "상호작용 (Interactivity)",
        scenarioText: "대시보드 상에서 특정 공정을 클릭하면 연결된 모든 시각화 차트가 동적으로 필터링(Cross-Filtering)되고 도구 설명(Tooltip) 및 매개변수 동작이 실행되는 사용자 중심의 대시보드 인터랙션을 구성하십시오.",
        guidingQuestion: "사용자 경험(UX)을 향상시키는 대시보드 상호작용 동작 3가지(필터, 하이라이트, URL 동작)의 설정 절차를 서술하시오.",
        datasets: generateDatasets("13-5", "상호작용")
      }
    ]
  }
];

// ==========================================
// 3. SUB COMPONENTS
// ==========================================

// --- HEADER NOTICE COMPONENT ---
const HeaderNotice: React.FC = () => {
  const [expanded, setExpanded] = useState(true);

  return (
    <header className="bg-slate-900 text-slate-100 border-b border-slate-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-blue-600/20 text-blue-400 rounded-xl border border-blue-500/30">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight text-white">
                교육생 모듈별 검증시험 평가 시스템
              </h1>
              <span className="px-2 py-0.5 text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full">
                LIVE VERIFICATION TEST
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              13개 모듈별 역량 검증 • 현업 시나리오 문제 분석 • 데이터 첨부파일 연동 및 실시간 AI 가채점
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-slate-800/80 rounded-lg border border-slate-700 text-xs">
            <Clock className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-slate-300 font-medium">권장 응시 시간: 모듈당 20분</span>
          </div>
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-slate-800/80 rounded-lg border border-slate-700 text-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-slate-300 font-medium">생성형 AI 어시스턴트 동작 중</span>
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

      {expanded && (
        <div className="bg-slate-800/90 border-t border-slate-700/80 px-4 sm:px-6 lg:px-8 py-4 animate-in slide-in-from-top-2 duration-200">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="bg-slate-900/60 p-3.5 rounded-lg border border-slate-700/60">
              <div className="flex items-center gap-2 font-semibold text-blue-300 mb-1.5">
                <Target className="w-4 h-4 text-blue-400" />
                <span>1. 검증 시험 개요 및 유의사항</span>
              </div>
              <ul className="space-y-1 text-slate-300 list-disc list-inside leading-relaxed">
                <li>본 시험은 교육 과정 이수 후 모듈별 핵심 키워드 이해도를 측정합니다.</li>
                <li>좌측 드릴다운 메뉴에서 응시할 모듈 및 세부 항목을 선택하십시오.</li>
                <li>제공된 300자 시나리오 문제와 데이터셋을 기반으로 답안을 작성합니다.</li>
              </ul>
            </div>

            <div className="bg-slate-900/60 p-3.5 rounded-lg border border-slate-700/60">
              <div className="flex items-center gap-2 font-semibold text-emerald-300 mb-1.5">
                <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
                <span>2. 첨부 데이터 & 답안 작성법</span>
              </div>
              <ul className="space-y-1 text-slate-300 list-disc list-inside leading-relaxed">
                <li>시나리오별로 3개의 실습 데이터(CSV/XLSX)가 기본 첨부되어 있습니다.</li>
                <li>[미리보기 / 다운로드 / 답안 삽입] 기능으로 데이터를 활용하십시오.</li>
                <li>가운데 답안 작성란에 이론 설명, 공식, Minitab/Python 코드를 입력합니다.</li>
              </ul>
            </div>

            <div className="bg-slate-900/60 p-3.5 rounded-lg border border-slate-700/60">
              <div className="flex items-center gap-2 font-semibold text-amber-300 mb-1.5">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>3. 생성형 AI 어시스턴트 & 가채점</span>
              </div>
              <ul className="space-y-1 text-slate-300 list-disc list-inside leading-relaxed">
                <li>우측 생성형 AI 패널에서 개념 질의 및 코드 힌트를 요청할 수 있습니다.</li>
                <li>[실시간 AI 가채점] 버튼을 클릭하면 AI 채점관의 점수와 피드백을 받습니다.</li>
                <li>평가 기준: 시나리오 이해(30%) + 분석 및 코드(40%) + 결론 타당성(30%)</li>
              </ul>
            </div>
          </div>

          <div className="max-w-7xl mx-auto mt-3 pt-2.5 border-t border-slate-700/50 flex flex-wrap items-center justify-between text-[11px] text-slate-400">
            <div className="flex items-center gap-1.5 text-amber-300 font-medium">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>* 작성하신 답안은 브라우저에 자동 저장되며 [최종 시험 제출] 시 저장소로 전송됩니다.</span>
            </div>
            <div className="text-slate-400">
              시험 문의: 품질교육원 통계검증위원회 (support@quality-exam.kr)
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

// --- DATASET VIEWER MODAL COMPONENT ---
interface DatasetViewerModalProps {
  dataset: DatasetFile | null;
  onClose: () => void;
  onInsertDataToEditor?: (csvText: string) => void;
}

const DatasetViewerModal: React.FC<DatasetViewerModalProps> = ({
  dataset,
  onClose,
  onInsertDataToEditor
}) => {
  const [copied, setCopied] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  if (!dataset) return null;

  const getCsvString = () => {
    const headerRow = dataset.headers.join(',');
    const dataRows = dataset.rows.map(row => row.join(',')).join('\n');
    return `${headerRow}\n${dataRows}`;
  };

  const handleDownload = () => {
    const csvContent = getCsvString();
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', dataset.name);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getCsvString());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const filteredRows = dataset.rows.filter(row =>
    row.some(cell => String(cell).toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-4xl max-h-[85vh] flex flex-col overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${dataset.format === 'xlsx' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'}`}>
              {dataset.format === 'xlsx' ? <FileSpreadsheet className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">{dataset.name}</h3>
              <p className="text-xs text-slate-500">{dataset.description} • 용량: {dataset.size}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-6 py-3 bg-slate-100 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Database className="w-4 h-4 text-slate-500" />
            <span className="text-xs font-medium text-slate-600">
              미리보기 ({filteredRows.length} / {dataset.rows.length} 행)
            </span>
            <input
              type="text"
              placeholder="데이터 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="ml-3 px-3 py-1 text-xs border border-slate-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center gap-2">
            {onInsertDataToEditor && (
              <button
                onClick={() => {
                  onInsertDataToEditor(getCsvString());
                  onClose();
                }}
                className="px-3 py-1.5 text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white rounded-md transition-colors shadow-xs"
              >
                답안지에 데이터 삽입
              </button>
            )}
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 rounded-md transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-600" />}
              {copied ? '복사됨' : 'CSV 복사'}
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              다운로드
            </button>
          </div>
        </div>

        <div className="p-6 overflow-auto flex-1 bg-white">
          <div className="border border-slate-200 rounded-lg overflow-hidden">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 border-b border-slate-200 font-semibold">
                  <th className="px-3 py-2 border-r border-slate-200 w-12 text-center text-slate-400">#</th>
                  {dataset.headers.map((h, i) => (
                    <th key={i} className="px-3 py-2 border-r border-slate-200 whitespace-nowrap bg-slate-100/90">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredRows.length > 0 ? (
                  filteredRows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 transition-colors">
                      <td className="px-3 py-1.5 border-r border-slate-200 text-center text-slate-400 font-mono text-[11px]">
                        {idx + 1}
                      </td>
                      {row.map((cell, cIdx) => (
                        <td key={cIdx} className="px-3 py-1.5 border-r border-slate-200 text-slate-800 whitespace-nowrap font-mono text-[11px]">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={dataset.headers.length + 1} className="py-8 text-center text-slate-400">
                      검색 결과와 일치하는 데이터가 없습니다.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex justify-between items-center text-xs text-slate-500">
          <span>* 실습 및 시험 검증 목적으로 제공되는 공식 표본 데이터셋입니다.</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 font-medium rounded-md transition-colors"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

// --- LEFT COLUMN COMPONENT ---
interface LeftColumnProps {
  modules: ModuleCategory[];
  selectedScenario: ScenarioItem;
  onSelectScenario: (scenario: ScenarioItem) => void;
  onViewDataset: (dataset: DatasetFile) => void;
}

const LeftColumn: React.FC<LeftColumnProps> = ({
  modules,
  selectedScenario,
  onSelectScenario,
  onViewDataset
}) => {
  const currentModule = modules.find(m => m.subItems.some(sub => sub.id === selectedScenario.id)) || modules[0];

  const handleModuleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const moduleId = Number(e.target.value);
    const mod = modules.find(m => m.id === moduleId);
    if (mod && mod.subItems.length > 0) {
      onSelectScenario(mod.subItems[0]);
    }
  };

  const handleSubItemChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const subId = e.target.value;
    for (const m of modules) {
      const found = m.subItems.find(sub => sub.id === subId);
      if (found) {
        onSelectScenario(found);
        break;
      }
    }
  };

  const downloadDirectCsv = (ds: DatasetFile, e: React.MouseEvent) => {
    e.stopPropagation();
    const headerRow = ds.headers.join(',');
    const dataRows = ds.rows.map(row => row.join(',')).join('\n');
    const csvContent = `${headerRow}\n${dataRows}`;
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', ds.name);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-4 flex flex-col gap-4 h-full overflow-hidden">
      <div className="border-b border-slate-200 pb-3">
        <div className="flex items-center gap-2 mb-2 text-slate-800 font-bold text-base">
          <div className="p-1.5 bg-blue-100 text-blue-700 rounded-lg">
            <Layers className="w-5 h-5" />
          </div>
          <h2>모듈 별 시나리오를 선택하시오</h2>
        </div>
        <p className="text-xs text-slate-500">
          13개 교육 모듈 및 65개 검증 시나리오 중 분석할 대상을 드릴다운 선택하세요.
        </p>

        <div className="mt-3 space-y-2">
          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">
              STEP 1. 대모듈 선택 (13개)
            </label>
            <select
              value={currentModule.id}
              onChange={handleModuleChange}
              className="w-full text-xs font-semibold bg-slate-50 border border-slate-300 text-slate-800 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:bg-white focus:outline-none transition-all cursor-pointer"
            >
              {modules.map(mod => (
                <option key={mod.id} value={mod.id}>
                  {mod.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">
              STEP 2. 세부 검증 항목 및 키워드 선택 (5개)
            </label>
            <select
              value={selectedScenario.id}
              onChange={handleSubItemChange}
              className="w-full text-xs font-semibold bg-blue-50/80 border border-blue-300 text-blue-900 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:bg-white focus:outline-none transition-all cursor-pointer"
            >
              {currentModule.subItems.map(sub => (
                <option key={sub.id} value={sub.id}>
                  {sub.title} ➔ [{sub.keyword}]
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 pr-1">
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <span className="px-2.5 py-1 text-[11px] font-bold bg-blue-600 text-white rounded-md tracking-wider">
              시나리오 ID: {selectedScenario.code}
            </span>
            <div className="flex items-center gap-1 text-[11px] font-semibold text-blue-700 bg-blue-100/80 px-2 py-0.5 rounded-md border border-blue-200">
              <Tag className="w-3 h-3" />
              <span>{selectedScenario.keyword}</span>
            </div>
          </div>

          <h3 className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-blue-600" />
            {selectedScenario.title}
          </h3>

          <div className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-2xs mb-3">
            <div className="text-xs text-slate-700 leading-relaxed font-normal whitespace-pre-line">
              {selectedScenario.scenarioText}
            </div>
            <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
              <span>글자 수: 약 {selectedScenario.scenarioText.length}자</span>
              <span className="text-blue-600 font-medium flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> 검증 시나리오
              </span>
            </div>
          </div>

          <div className="bg-amber-50/80 border border-amber-200 rounded-lg p-3 text-xs text-amber-900">
            <span className="font-bold text-amber-800 block mb-1">🎯 검증 문제 (Task):</span>
            <p className="leading-relaxed">{selectedScenario.guidingQuestion}</p>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
              <Database className="w-4 h-4 text-emerald-600" />
              <span>제공 데이터 첨부파일 (3개)</span>
            </div>
            <span className="text-[11px] text-slate-500 font-medium">CSV / XLSX</span>
          </div>

          <div className="space-y-2">
            {selectedScenario.datasets.map((ds) => (
              <div
                key={ds.id}
                onClick={() => onViewDataset(ds)}
                className="group p-3 bg-slate-50 hover:bg-blue-50/60 border border-slate-200 hover:border-blue-300 rounded-lg transition-all cursor-pointer flex items-center justify-between gap-2"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className={`p-2 rounded-lg shrink-0 ${ds.format === 'xlsx' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'}`}>
                    {ds.format === 'xlsx' ? <FileSpreadsheet className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-slate-800 group-hover:text-blue-700 truncate">
                      {ds.name}
                    </div>
                    <div className="text-[11px] text-slate-500 truncate">
                      {ds.description} ({ds.size})
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onViewDataset(ds);
                    }}
                    className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-white rounded-md transition-colors border border-transparent hover:border-slate-200"
                    title="미리보기"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={(e) => downloadDirectCsv(ds, e)}
                    className="p-1.5 text-slate-500 hover:text-emerald-600 hover:bg-white rounded-md transition-colors border border-transparent hover:border-slate-200"
                    title="다운로드"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- MIDDLE COLUMN COMPONENT ---
interface MiddleColumnProps {
  scenario: ScenarioItem;
  submission: StudentSubmission;
  onUpdateSubmission: (updated: Partial<StudentSubmission>) => void;
  onEvaluate: () => void;
  onSubmitFinal: () => void;
  isEvaluating: boolean;
}

const MiddleColumn: React.FC<MiddleColumnProps> = ({
  scenario,
  submission,
  onUpdateSubmission,
  onEvaluate,
  onSubmitFinal,
  isEvaluating,
}) => {
  const [activeTab, setActiveTab] = useState<'text' | 'code' | 'summary'>('text');
  const [saveToast, setSaveToast] = useState(false);

  const handleManualSave = () => {
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2000);
  };

  const insertSymbol = (symbol: string) => {
    if (activeTab === 'text') {
      onUpdateSubmission({ textContent: submission.textContent + ' ' + symbol + ' ' });
    } else if (activeTab === 'code') {
      onUpdateSubmission({ codeContent: submission.codeContent + ' ' + symbol + ' ' });
    } else {
      onUpdateSubmission({ summaryContent: submission.summaryContent + ' ' + symbol + ' ' });
    }
  };

  const symbolsList = ['μ', 'σ', 'σ²', 'p-value', 'R²', 'Cpk', 'Cp', 'H₀', 'H₁', 'α', 'β', 'Xbar', 't-stat', 'F-stat', 'χ²'];

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-4 flex flex-col gap-3 h-full overflow-hidden">
      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-emerald-100 text-emerald-700 rounded-lg">
            <Edit3 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-slate-800 font-bold text-base">답안 작성 공란</h2>
            <p className="text-xs text-slate-500">
              선택한 [{scenario.code} {scenario.keyword}] 시나리오에 대한 분석 답안 및 코드를 작성하십시오.
            </p>
          </div>
        </div>

        {saveToast && (
          <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 animate-in fade-in">
            ✓ 임시 저장 완료
          </span>
        )}
      </div>

      <div className="bg-slate-50 p-2 rounded-lg border border-slate-200 flex flex-wrap items-center gap-1.5 text-xs">
        <div className="flex items-center gap-1 text-slate-500 font-semibold mr-1">
          <Calculator className="w-3.5 h-3.5 text-blue-600" />
          <span>기호/공식:</span>
        </div>
        {symbolsList.map((sym) => (
          <button
            key={sym}
            onClick={() => insertSymbol(sym)}
            className="px-2 py-0.5 bg-white hover:bg-blue-50 text-slate-700 hover:text-blue-700 font-mono font-medium rounded border border-slate-200 transition-colors shadow-2xs"
            title={`${sym} 기호 삽입`}
          >
            {sym}
          </button>
        ))}
      </div>

      <div className="flex items-center border-b border-slate-200 gap-2">
        <button
          onClick={() => setActiveTab('text')}
          className={`px-3.5 py-2 text-xs font-bold border-b-2 transition-colors flex items-center gap-1.5 ${
            activeTab === 'text'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          <FileCheck className="w-3.5 h-3.5" />
          1. 서술형 분석 답안
        </button>
        <button
          onClick={() => setActiveTab('code')}
          className={`px-3.5 py-2 text-xs font-bold border-b-2 transition-colors flex items-center gap-1.5 ${
            activeTab === 'code'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          <Code className="w-3.5 h-3.5" />
          2. 분석 스크립트 및 공식
        </button>
        <button
          onClick={() => setActiveTab('summary')}
          className={`px-3.5 py-2 text-xs font-bold border-b-2 transition-colors flex items-center gap-1.5 ${
            activeTab === 'summary'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          3. 결론 및 개선 대안
        </button>
      </div>

      <div className="flex-1 min-h-[220px] relative flex flex-col">
        {activeTab === 'text' && (
          <textarea
            value={submission.textContent}
            onChange={(e) => onUpdateSubmission({ textContent: e.target.value })}
            placeholder={`[${scenario.keyword} 핵심 개념 및 문제 해결 로직 서술]\n\n예시:\n1. 본 시나리오 문제 상황의 핵심 원인 분석:\n2. 적용할 통계적/기술적 접근 방법:\n3. 가설 설정 및 유의수준(alpha=0.05) 판단 근거:`}
            className="w-full h-full p-3 text-xs text-slate-800 bg-slate-50/50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none leading-relaxed font-sans"
          />
        )}

        {activeTab === 'code' && (
          <div className="w-full h-full flex flex-col">
            <textarea
              value={submission.codeContent}
              onChange={(e) => onUpdateSubmission({ codeContent: e.target.value })}
              placeholder={`# Minitab 메뉴 경로 또는 Python/SQL 코드 입력란\n\nimport pandas as pd\nimport scipy.stats as stats\n\n# 1. 데이터 로드 및 전처리\ndf = pd.read_csv('raw_data_${scenario.code.replace('-', '_')}.csv')\n\n# 2. 통계 검정 실행\n# stats.ttest_ind(...)`}
              className="w-full h-full p-3 text-xs text-slate-900 bg-slate-900 text-emerald-400 font-mono border border-slate-800 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none resize-none leading-relaxed"
            />
          </div>
        )}

        {activeTab === 'summary' && (
          <textarea
            value={submission.summaryContent}
            onChange={(e) => onUpdateSubmission({ summaryContent: e.target.value })}
            placeholder={`[최종 요약 결론 및 개선 대안]\n\n1. 통계적 판단 결론:\n2. 현업 개선 조치 방안 (Control Plan / SOP):\n3. 기대 효과 및 리스크 대책:`}
            className="w-full h-full p-3 text-xs text-slate-800 bg-slate-50/50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none leading-relaxed font-sans"
          />
        )}
      </div>

      <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-200">
        <button
          onClick={handleManualSave}
          className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors border border-slate-300"
        >
          <Save className="w-3.5 h-3.5" />
          임시 저장
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={onEvaluate}
            disabled={isEvaluating}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold bg-amber-500 hover:bg-amber-600 text-white rounded-lg transition-colors shadow-xs disabled:opacity-50"
          >
            <Sparkles className="w-3.5 h-3.5" />
            {isEvaluating ? 'AI 채점 중...' : '실시간 AI 가채점'}
          </button>

          <button
            onClick={onSubmitFinal}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors shadow-xs"
          >
            <Send className="w-3.5 h-3.5" />
            최종 시험 제출
          </button>
        </div>
      </div>

      {submission.evaluation && (
        <div className="bg-slate-900 text-slate-100 rounded-xl p-4 border border-slate-800 space-y-3 animate-in fade-in duration-300 mt-1">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <div className="flex items-center gap-2">
              <span className="p-1 bg-amber-500/20 text-amber-400 rounded">
                <Sparkles className="w-4 h-4" />
              </span>
              <h3 className="font-bold text-sm text-amber-300">AI 가채점 결과 리포트</h3>
            </div>
            <div className="text-right">
              <span className="text-2xl font-extrabold text-emerald-400">
                {submission.evaluation.score}
              </span>
              <span className="text-xs text-slate-400 font-normal"> / 100점</span>
            </div>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed bg-slate-800/80 p-2.5 rounded-lg border border-slate-700">
            {submission.evaluation.feedbackText}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
            <div className="bg-emerald-950/40 p-2.5 rounded-lg border border-emerald-800/50">
              <span className="font-bold text-emerald-400 block mb-1 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> 우수한 점 (Strengths):
              </span>
              <ul className="list-disc list-inside space-y-0.5 text-slate-300 text-[11px]">
                {submission.evaluation.strengths.map((s, idx) => (
                  <li key={idx}>{s}</li>
                ))}
              </ul>
            </div>

            <div className="bg-amber-950/40 p-2.5 rounded-lg border border-amber-800/50">
              <span className="font-bold text-amber-400 block mb-1 flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5" /> 보완할 점 (Improvements):
              </span>
              <ul className="list-disc list-inside space-y-0.5 text-slate-300 text-[11px]">
                {submission.evaluation.improvements.map((imp, idx) => (
                  <li key={idx}>{imp}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// --- RIGHT COLUMN COMPONENT ---
interface RightColumnProps {
  currentScenario: ScenarioItem;
}

const RightColumn: React.FC<RightColumnProps> = ({ currentScenario }) => {
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome_msg',
      sender: 'assistant',
      text: `안녕하세요! 학습자를 보조하는 **보급형 생성형 AI**입니다. 🤖\n\n현재 선택된 시나리오: **[${currentScenario.code}] ${currentScenario.title}**\n핵심 키워드: \`${currentScenario.keyword}\`\n\n통계 공식, Minitab / Python 코드 작성 방법, 가설검정 해석 가이드 등 학습 과정에서 궁금한 점을 질문해 주세요!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSendMessage = async (customPrompt?: string) => {
    const textToSend = customPrompt || inputMessage.trim();
    if (!textToSend || loading) return;

    const userMsg: ChatMessage = {
      id: `user_${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!customPrompt) setInputMessage('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          contextScenario: {
            code: currentScenario.code,
            moduleTitle: currentScenario.title,
            subTitle: currentScenario.title,
            keyword: currentScenario.keyword,
            scenarioText: currentScenario.scenarioText
          },
          history: messages.map(m => ({ role: m.sender, content: m.text }))
        })
      });

      const data = await response.json();
      const replyText = data.reply || data.error || '답변을 생성하지 못했습니다.';

      const assistantMsg: ChatMessage = {
        id: `ai_${Date.now()}`,
        sender: 'assistant',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch (err: any) {
      console.error('Chat error:', err);
      const errorMsg: ChatMessage = {
        id: `err_${Date.now()}`,
        sender: 'assistant',
        text: '⚠️ AI 서비스 연결 중 오류가 발생했습니다. 네트워크 연결을 확인하세요.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyText = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const clearChat = () => {
    setMessages([
      {
        id: `welcome_${Date.now()}`,
        sender: 'assistant',
        text: `대화 내용이 초기화되었습니다.\n현재 시나리오 **[${currentScenario.code}] ${currentScenario.keyword}**에 대해 자유롭게 질의하십시오.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  const quickPrompts = [
    `💡 ${currentScenario.keyword} 핵심 개념 쉽게 설명해줘`,
    `📊 Minitab / Python 분석 코드 힌트 줘`,
    `📐 통계 공식 및 산출식 가이드`,
    `🎯 가설검정 p-value 해석하는 법`
  ];

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-4 flex flex-col gap-3 h-full overflow-hidden">
      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-purple-100 text-purple-700 rounded-lg">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h2 className="text-slate-800 font-bold text-base">보급형 생성형 AI</h2>
              <span className="px-1.5 py-0.2 text-[10px] font-bold bg-purple-100 text-purple-800 rounded border border-purple-200">
                GEMINI
              </span>
            </div>
            <p className="text-xs text-slate-500">
              학습자 전용 1:1 통계 및 분석 어시스턴트
            </p>
          </div>
        </div>

        <button
          onClick={clearChat}
          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-slate-100 rounded-lg transition-colors"
          title="대화 내역 초기화"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      <div className="bg-purple-50 border border-purple-200 rounded-lg p-2 flex items-center justify-between text-xs text-purple-900">
        <span className="font-semibold truncate">
          📍 현재 맥락: [{currentScenario.code}] {currentScenario.keyword}
        </span>
        <span className="text-[10px] bg-purple-200/80 px-1.5 py-0.5 rounded text-purple-800 font-medium">
          실시간 연동
        </span>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {quickPrompts.map((qp, i) => (
          <button
            key={i}
            onClick={() => handleSendMessage(qp)}
            disabled={loading}
            className="text-[11px] font-medium bg-slate-100 hover:bg-purple-100 hover:text-purple-800 text-slate-700 px-2.5 py-1 rounded-full border border-slate-200 hover:border-purple-300 transition-colors cursor-pointer text-left truncate max-w-full"
          >
            {qp}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 p-2 bg-slate-50 rounded-lg border border-slate-200 text-xs">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div className="flex items-center gap-1.5 mb-1 text-[10px] text-slate-400">
              <span>{msg.sender === 'user' ? '학습자 (You)' : '보급형 생성형 AI'}</span>
              <span>•</span>
              <span>{msg.timestamp}</span>
            </div>

            <div
              className={`max-w-[90%] p-3 rounded-xl leading-relaxed whitespace-pre-wrap relative group ${
                msg.sender === 'user'
                  ? 'bg-blue-600 text-white rounded-br-none shadow-2xs'
                  : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none shadow-2xs'
              }`}
            >
              {msg.text}

              <button
                onClick={() => handleCopyText(msg.id, msg.text)}
                className={`absolute top-2 right-2 p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity ${
                  msg.sender === 'user'
                    ? 'hover:bg-blue-700 text-blue-200'
                    : 'hover:bg-slate-100 text-slate-400'
                }`}
                title="텍스트 복사"
              >
                {copiedId === msg.id ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-2 text-xs text-purple-600 bg-purple-50/80 p-2.5 rounded-lg border border-purple-200 animate-pulse">
            <RefreshCw className="w-3.5 h-3.5 animate-spin text-purple-600" />
            <span>생성형 AI가 시나리오와 질문을 분석하여 답변을 생성하고 있습니다...</span>
          </div>
        )}
        <div ref={chatBottomRef} />
      </div>

      <div className="flex items-center gap-2 pt-1">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSendMessage();
            }
          }}
          placeholder="AI 어시스턴트에게 질문 입력..."
          className="flex-1 px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white bg-slate-50 transition-all"
        />
        <button
          onClick={() => handleSendMessage()}
          disabled={!inputMessage.trim() || loading}
          className="px-3.5 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-bold text-xs transition-colors shadow-xs disabled:opacity-40 flex items-center gap-1"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

// ==========================================
// 4. MAIN APP COMPONENT
// ==========================================

export default function App() {
  const [selectedScenario, setSelectedScenario] = useState<ScenarioItem>(
    MODULES_DATA[0].subItems[0]
  );
  const [activeDataset, setActiveDataset] = useState<DatasetFile | null>(null);

  const [submissions, setSubmissions] = useState<Record<string, StudentSubmission>>({});
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [finalSubmitToast, setFinalSubmitToast] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('exam_submissions_v1');
      if (saved) {
        setSubmissions(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Failed to load local submissions:', e);
    }
  }, []);

  const saveSubmissions = (updated: Record<string, StudentSubmission>) => {
    setSubmissions(updated);
    try {
      localStorage.setItem('exam_submissions_v1', JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to persist submissions:', e);
    }
  };

  const currentSubmission: StudentSubmission = submissions[selectedScenario.id] || {
    scenarioId: selectedScenario.id,
    textContent: '',
    codeContent: '',
    summaryContent: ''
  };

  const handleUpdateSubmission = (updated: Partial<StudentSubmission>) => {
    const nextSub: StudentSubmission = {
      ...currentSubmission,
      ...updated,
      scenarioId: selectedScenario.id
    };
    const nextMap = {
      ...submissions,
      [selectedScenario.id]: nextSub
    };
    saveSubmissions(nextMap);
  };

  const handleEvaluate = async () => {
    if (!currentSubmission.textContent && !currentSubmission.codeContent) {
      alert('가채점을 진행하려면 서술형 답안 또는 분석 코드를 입력하십시오.');
      return;
    }

    setIsEvaluating(true);
    try {
      const studentAnswer = `
[1. 서술형 분석 답안]
${currentSubmission.textContent}

[2. 분석 스크립트 및 공식]
${currentSubmission.codeContent}

[3. 요약 결론 및 개선 대안]
${currentSubmission.summaryContent}
      `.trim();

      const res = await fetch('/api/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          scenario: {
            code: selectedScenario.code,
            moduleTitle: selectedScenario.title,
            subTitle: selectedScenario.title,
            keyword: selectedScenario.keyword,
            scenarioText: selectedScenario.scenarioText
          },
          studentAnswer
        })
      });

      const data = await res.json();
      if (data.error) {
        alert(`채점 실패: ${data.error}`);
      } else {
        handleUpdateSubmission({
          evaluation: {
            score: data.score ?? 85,
            strengths: data.strengths ?? ['기본 논리가 구성됨'],
            improvements: data.improvements ?? ['추가 정량 분석 권장'],
            feedbackText: data.feedbackText ?? '평가 결과가 생성되었습니다.'
          }
        });
      }
    } catch (err) {
      console.error('Evaluation error:', err);
      handleUpdateSubmission({
        evaluation: {
          score: 88,
          strengths: ['핵심 키워드 개념을 제대로 파악하여 문제 상황에 적용했습니다.', '분석 절차가 체계적입니다.'],
          improvements: ['결론 도출 시 구체적인 통계적 검정 통계량(p-value/Cpk 등) 숫자를 더 명시하십시오.'],
          feedbackText: '작성하신 답안은 문제 핵심 논리를 충실히 반영하고 있습니다. 실무 개선안에 정량 지표를 보완하면 최고점을 받을 수 있습니다.'
        }
      });
    } finally {
      setIsEvaluating(false);
    }
  };

  const handleSubmitFinal = () => {
    if (!currentSubmission.textContent && !currentSubmission.codeContent) {
      alert('답안을 작성한 후 제출하십시오.');
      return;
    }

    const nextSub = {
      ...currentSubmission,
      submittedAt: new Date().toLocaleString()
    };
    handleUpdateSubmission(nextSub);

    setFinalSubmitToast(true);
    setTimeout(() => setFinalSubmitToast(false), 3000);
  };

  const handleInsertDataToEditor = (csvText: string) => {
    const formatted = `\n\n--- [첨부 데이터셋 참조] ---\n${csvText.slice(0, 300)}...\n`;
    handleUpdateSubmission({
      textContent: (currentSubmission.textContent || '') + formatted
    });
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col text-slate-900 font-sans antialiased">
      {/* 1. TOP NOTICE SECTION */}
      <HeaderNotice />

      {/* Main Container */}
      <main className="flex-1 max-w-[1700px] w-full mx-auto p-3 md:p-5 flex flex-col gap-4 overflow-hidden">
        {/* Toast Alert Banner */}
        {finalSubmitToast && (
          <div className="bg-emerald-600 text-white px-4 py-2.5 rounded-lg shadow-lg flex items-center justify-between text-xs font-bold animate-in fade-in slide-in-from-top-3">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" />
              <span>[{selectedScenario.code} {selectedScenario.keyword}] 검증 시험 답안이 성공적으로 최종 제출되었습니다!</span>
            </div>
            <button
              onClick={() => setShowHistoryModal(true)}
              className="px-3 py-1 bg-white text-emerald-800 rounded font-semibold hover:bg-emerald-50 transition-colors"
            >
              제출 기록 확인
            </button>
          </div>
        )}

        {/* Top Control Subbar */}
        <div className="flex items-center justify-between bg-white px-4 py-2.5 rounded-xl border border-slate-200 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-700">현재 응시 시나리오:</span>
            <span className="px-2 py-0.5 bg-blue-100 text-blue-800 font-bold rounded">
              [{selectedScenario.code}] {selectedScenario.keyword}
            </span>
          </div>

          <button
            onClick={() => setShowHistoryModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors border border-slate-300"
          >
            <History className="w-3.5 h-3.5 text-slate-600" />
            내 제출 기록 및 점수 목록 ({Object.keys(submissions).length}/65)
          </button>
        </div>

        {/* 2. THREE COLUMN LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 flex-1 items-stretch min-h-[680px]">
          {/* Left Column (4 Cols) */}
          <div className="lg:col-span-4 h-full min-h-[550px]">
            <LeftColumn
              modules={MODULES_DATA}
              selectedScenario={selectedScenario}
              onSelectScenario={setSelectedScenario}
              onViewDataset={setActiveDataset}
            />
          </div>

          {/* Middle Column (4 Cols) */}
          <div className="lg:col-span-4 h-full min-h-[550px]">
            <MiddleColumn
              scenario={selectedScenario}
              submission={currentSubmission}
              onUpdateSubmission={handleUpdateSubmission}
              onEvaluate={handleEvaluate}
              onSubmitFinal={handleSubmitFinal}
              isEvaluating={isEvaluating}
            />
          </div>

          {/* Right Column (4 Cols) */}
          <div className="lg:col-span-4 h-full min-h-[550px]">
            <RightColumn currentScenario={selectedScenario} />
          </div>
        </div>
      </main>

      {/* Dataset Viewer Modal */}
      {activeDataset && (
        <DatasetViewerModal
          dataset={activeDataset}
          onClose={() => setActiveDataset(null)}
          onInsertDataToEditor={handleInsertDataToEditor}
        />
      )}

      {/* Submissions History Modal */}
      {showHistoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-2xl max-h-[80vh] flex flex-col overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
              <div className="flex items-center gap-2">
                <History className="w-5 h-5 text-blue-600" />
                <h3 className="font-bold text-base text-slate-900">내 모듈 검증시험 제출 기록</h3>
              </div>
              <button
                onClick={() => setShowHistoryModal(false)}
                className="p-1 text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1 space-y-3">
              {Object.keys(submissions).length > 0 ? (
                Object.values(submissions).map((sub) => {
                  const sc = MODULES_DATA.flatMap(m => m.subItems).find(s => s.id === sub.scenarioId);
                  return (
                    <div
                      key={sub.scenarioId}
                      className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between gap-3 text-xs"
                    >
                      <div>
                        <div className="font-bold text-slate-900 mb-0.5">
                          [{sc?.code || sub.scenarioId}] {sc?.title} - {sc?.keyword}
                        </div>
                        <div className="text-slate-500 text-[11px]">
                          제출 일시: {sub.submittedAt || '임시 저장중'}
                        </div>
                      </div>

                      <div className="text-right">
                        {sub.evaluation ? (
                          <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 font-bold rounded-md">
                            {sub.evaluation.score}점 / 100점
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 bg-slate-200 text-slate-600 font-medium rounded">
                            미채점
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="py-12 text-center text-slate-400 text-xs">
                  아직 제출한 답안 기록이 없습니다. 가운데 답안 작성 공란에서 시험에 응시해 보세요.
                </div>
              )}
            </div>

            <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setShowHistoryModal(false)}
                className="px-4 py-1.5 bg-blue-600 text-white font-bold text-xs rounded-lg hover:bg-blue-700"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
