# Corp KYC Studio

**法人顧客オンボーディングのためのケース管理プラットフォーム**  
A case management platform for corporate KYC / onboarding at banks and financial institutions.

---

## Why（なぜ必要か）

法人顧客の口座開設・取引開始（KYC/オンボーディング）は、銀行業務の中で最も遅延とコストが集中する工程のひとつです。McKinseyの調査では新規法人顧客のオンボーディングに最大100日を要するケースがあると報告されています。

その根本原因は「書類が多い」ことではなく、**判断待ち・情報欠落の追跡・例外処理・承認の連鎖が、担当者の手作業に依存していること**です。

Corp KYC Studio は、この業務の「詰まり」を解消するために設計された業務OSです。

---

## Problem（課題）

| 問題 | 現場への影響 |
|------|------------|
| 案件の状況が担当者の頭の中にある | 引き継ぎ・管理職確認のたびに説明コストが発生 |
| 不足書類の追跡がメール・Excelに散在 | 差し戻し・再提出が繰り返され、リードタイムが伸びる |
| 例外案件が後付けで処理される | 高リスク案件の見落とし・監査指摘リスク |
| 判断の根拠が残らない | 監査・再審査時に説明責任が果たせない |

---

## Solution（解決方法）

Corp KYC Studio は以下を1画面で提供します：

1. **ケースボード（Dashboard）** — 全案件のステータスを一目で把握。滞留・例外・未完了を即座に発見できる
2. **案件詳細（Case Detail）** — 法人情報・実質支配者・スクリーニング結果・必要書類・提出状況を1ケース1画面に集約
3. **要件チェックリスト（Requirements）** — 商品・リスクティアに応じた必要書類を自動生成し、充足状況をリアルタイム表示
4. **判断支援パネル（Decision）** — 書類充足率・スクリーニングヒット・推奨判断を根拠付きで提示。アナリストが判断し、記録する
5. **監査証跡（Audit Trail）** — 誰が・いつ・何をしたかを全件タイムライン記録。後追い再現が可能

---

## How to use（使い方）

### 1. 起動方法

```bash
# 依存関係のインストール
npm install

# 開発サーバー起動
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開きます。

### 2. 基本フロー

```
① Dashboard で案件一覧を確認
② "+ New Case" から新規案件を起票
③ 案件詳細で要件・証拠・判断を管理
④ "Advance Status →" でステータスを進める
⑤ 例外が発生したら "⚠ Raise Exception" で例外状態へ昇格
⑥ Decision タブで判断を記録・確定
```

### 3. 案件ステータスの流れ

```
Draft → IntakeValidated → WaitingForEvidence → InReview
                                                    ↓         ↓          ↓
                                               Exception   Approved   Rejected
                                                    ↓         ↓          ↓
                                                        → Closed →  Reopened
```

### 4. フォルダ構成

```
src/
├── app/
│   ├── page.tsx                    # Dashboard
│   ├── cases/
│   │   ├── new/page.tsx            # 新規案件フォーム
│   │   └── [id]/page.tsx           # 案件詳細
│   └── api/cases/                  # REST API routes
│       ├── route.ts                # GET all / POST create
│       └── [id]/
│           ├── route.ts            # GET / PATCH
│           ├── advance/route.ts    # POST ステータス進行
│           ├── decision/route.ts   # POST 判断記録
│           ├── evidence/route.ts   # POST 証拠追加
│           └── events/route.ts     # GET 監査証跡
├── components/
│   ├── Navigation.tsx
│   ├── CaseTable.tsx
│   ├── StatusBadge.tsx
│   ├── RiskBadge.tsx
│   ├── CaseTabs.tsx
│   ├── RequirementChecklist.tsx
│   ├── EvidencePanel.tsx
│   ├── DecisionPanel.tsx
│   └── AuditTrail.tsx
├── lib/
│   └── store.ts                    # In-memory data store + seed data
└── types/
    └── index.ts                    # TypeScript domain types
```

---

## Screenshots

### Dashboard — 案件一覧

![Dashboard](https://github.com/user-attachments/assets/4653d78a-c446-4bc0-9673-60413cd22c88)

---

### Case Detail — 法人情報・UBO・スクリーニング結果

![Case Detail - Overview](https://github.com/user-attachments/assets/1084ab27-c7ec-4fee-b550-5fbff6ccfc13)

---

### Requirements — 書類要件チェックリスト

![Case Detail - Requirements](https://github.com/user-attachments/assets/b1e27f4a-bba9-4f43-a243-8998ec7cf098)

---

### Decision — 判断支援パネル（書類充足率・スクリーニング・判断記録）

![Case Detail - Decision](https://github.com/user-attachments/assets/984b96b2-f52b-491d-b2be-ea71c2813d7a)

---

### New Case — 案件起票フォーム

![New Case Form](https://github.com/user-attachments/assets/06b89c73-c2ed-4dde-938a-b47a9267fb0c)

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14 (App Router), TypeScript, Tailwind CSS |
| API | Next.js Route Handlers |
| Data | In-memory store with seed data (demo) |
| Runtime | Node.js 18+ |

> **Note**: The in-memory store resets on server restart. To persist data, replace `src/lib/store.ts` with a PostgreSQL + Prisma implementation as described in `docs/04_architecture/`.

---

## References

- McKinsey: [Winning corporate clients with great onboarding](https://www.mckinsey.com/industries/financial-services/our-insights/winning-corporate-clients-with-great-onboarding)
- McKinsey: [How agentic AI can change the way banks fight financial crime](https://www.mckinsey.com/capabilities/risk-and-resilience/our-insights/how-agentic-ai-can-change-the-way-banks-fight-financial-crime)
- PwC/TheCityUK: [Reducing the cost of compliance](https://www.pwc.co.uk/financial-services/assets/pdf/reducing-cost-of-compliance.pdf)
