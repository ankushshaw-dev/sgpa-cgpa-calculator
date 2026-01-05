import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  companies,
  checkEligibility,
  categoryLabels,
  categoryColors,
  type Company,
} from '@/data/placementCriteria';
import { loadAllData } from '@/utils/storage';
import { semesters, marksToGrade } from '@/data/curriculum';
import {
  ArrowLeft,
  Building2,
  CheckCircle2,
  XCircle,
  Briefcase,
  GraduationCap,
  IndianRupee,
  AlertTriangle,
  Search,
  Filter,
} from 'lucide-react';

export default function PlacementChecker() {
  const allData = loadAllData();

  // Calculate CGPA from saved data
  const calculateCGPA = () => {
    let totalWeightedGP = 0;
    let totalCredits = 0;

    semesters.forEach((semester) => {
      const semesterMarks = allData.semesters[semester.number];
      if (!semesterMarks) return;

      semester.subjects.forEach((subject) => {
        const mark = semesterMarks[subject.code];
        if (typeof mark === 'number' && mark >= 0 && mark <= 100) {
          const { gradePoint } = marksToGrade(mark);
          totalWeightedGP += gradePoint * subject.credits;
          totalCredits += subject.credits;
        }
      });
    });

    return totalCredits > 0 ? totalWeightedGP / totalCredits : null;
  };

  const savedCGPA = calculateCGPA();

  const [cgpa, setCgpa] = useState<string>(savedCGPA?.toFixed(2) || '');
  const [backlogs, setBacklogs] = useState<string>('0');
  const [hasGapYear, setHasGapYear] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const cgpaValue = parseFloat(cgpa) || 0;
  const backlogsValue = parseInt(backlogs) || 0;

  const { eligible, notEligible } = useMemo(
    () => checkEligibility(cgpaValue, backlogsValue, hasGapYear),
    [cgpaValue, backlogsValue, hasGapYear]
  );

  const filterCompanies = (list: Company[]) => {
    return list.filter((company) => {
      const matchesSearch = company.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === 'all' || company.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  };

  const groupByCategory = (list: Company[]) => {
    const groups: Record<string, Company[]> = {
      product: [],
      startup: [],
      service: [],
      consulting: [],
      mnc: [],
    };
    list.forEach((company) => {
      groups[company.category].push(company);
    });
    return groups;
  };

  const filteredEligible = filterCompanies(eligible);
  const filteredNotEligible = filterCompanies(notEligible);
  
  const eligibleByCategory = groupByCategory(filteredEligible);
  const notEligibleByCategory = groupByCategory(filteredNotEligible);

  const categoryOrder: Company['category'][] = ['product', 'startup', 'service', 'consulting', 'mnc'];

  const categoryIcons: Record<Company['category'], string> = {
    product: '🚀',
    service: '💼',
    startup: '⚡',
    consulting: '📊',
    mnc: '🏦',
  };

  const CompanyCard = ({
    company,
    isEligible,
  }: {
    company: Company;
    isEligible: boolean;
  }) => (
    <Card
      className={`p-4 transition-all duration-200 ${
        isEligible
          ? 'bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-950/40 dark:to-green-950/40 border-emerald-300 dark:border-emerald-700 hover:shadow-lg hover:shadow-emerald-200/50 dark:hover:shadow-emerald-900/50 hover:border-emerald-400'
          : 'bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-950/40 dark:to-rose-950/40 border-red-300 dark:border-red-700 hover:shadow-lg hover:shadow-red-200/50 dark:hover:shadow-red-900/50'
      }`}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          {isEligible ? (
            <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          ) : (
            <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
          )}
          <h3 className="font-semibold text-foreground">{company.name}</h3>
        </div>
        <Badge className={categoryColors[company.category]}>
          {categoryLabels[company.category]}
        </Badge>
      </div>

      <div className="grid grid-cols-2 gap-2 text-sm mb-3">
        <div className="flex items-center gap-1.5">
          <GraduationCap className="h-4 w-4 text-muted-foreground" />
          <span>
            Min CGPA: <strong>{company.minCGPA}</strong>
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <IndianRupee className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium text-accent">{company.averagePackage}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          <span>
            Backlogs: {company.backlogsAllowed === 0 ? 'Not Allowed' : `≤${company.backlogsAllowed}`}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <Briefcase className="h-4 w-4 text-muted-foreground" />
          <span>Gap Year: {company.gapYearAllowed ? 'Allowed' : 'Not Allowed'}</span>
        </div>
      </div>

      <div className="text-xs text-muted-foreground mb-2">
        <strong>Roles:</strong> {company.roles.join(', ')}
      </div>

      {company.specialRequirements && (
        <div className="text-xs text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 p-2 rounded">
          💡 {company.specialRequirements}
        </div>
      )}

      {!isEligible && (
        <div className="mt-3 pt-3 border-t border-red-200 dark:border-red-800">
          <div className="text-xs text-red-600 dark:text-red-400 flex items-center gap-1 font-medium">
            <XCircle className="h-3 w-3" />
            {cgpaValue < company.minCGPA && `Need CGPA ≥ ${company.minCGPA}`}
            {backlogsValue > company.backlogsAllowed && ' | Clear backlogs'}
            {hasGapYear && !company.gapYearAllowed && ' | Gap year not allowed'}
          </div>
        </div>
      )}
    </Card>
  );

  const renderCategorySection = (
    categoryGroups: Record<string, Company[]>,
    isEligible: boolean
  ) => {
    return categoryOrder.map((category) => {
      const companiesInCategory = categoryGroups[category];
      if (companiesInCategory.length === 0) return null;

      return (
        <div key={category} className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">{categoryIcons[category]}</span>
            <h3 className="text-xl font-bold text-foreground">
              {categoryLabels[category]}
            </h3>
            <Badge variant="secondary" className="ml-2">
              {companiesInCategory.length} {companiesInCategory.length === 1 ? 'company' : 'companies'}
            </Badge>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {companiesInCategory.map((company) => (
              <CompanyCard
                key={company.name}
                company={company}
                isEligible={isEligible}
              />
            ))}
          </div>
        </div>
      );
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary via-primary to-accent text-primary-foreground shadow-xl">
        <div className="container mx-auto px-4 py-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm opacity-80 hover:opacity-100 mb-4 transition-opacity"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Calculator
          </Link>
          <div className="flex items-center gap-3">
            <Briefcase className="h-10 w-10" />
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">Placement Eligibility Checker</h1>
              <p className="opacity-90 mt-1">
                Check your eligibility for 100+ top companies
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Input Section */}
        <Card className="p-6 mb-8 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-primary" />
            Enter Your Details
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cgpa">Your CGPA (out of 10)</Label>
              <Input
                id="cgpa"
                type="number"
                min="0"
                max="10"
                step="0.01"
                value={cgpa}
                onChange={(e) => setCgpa(e.target.value)}
                placeholder="e.g., 8.5"
                className="bg-background"
              />
              {savedCGPA && (
                <p className="text-xs text-muted-foreground">
                  Auto-filled from your saved SGPA data
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="backlogs">Active Backlogs</Label>
              <Input
                id="backlogs"
                type="number"
                min="0"
                value={backlogs}
                onChange={(e) => setBacklogs(e.target.value)}
                placeholder="0"
                className="bg-background"
              />
            </div>

            <div className="space-y-2">
              <Label>Gap Year</Label>
              <div className="flex items-center space-x-2 h-10">
                <Switch
                  id="gapYear"
                  checked={hasGapYear}
                  onCheckedChange={setHasGapYear}
                />
                <Label htmlFor="gapYear" className="font-normal cursor-pointer">
                  {hasGapYear ? 'Yes, I have a gap year' : 'No gap year'}
                </Label>
              </div>
            </div>

            <div className="flex items-end">
              <div className="w-full p-3 bg-primary/10 rounded-lg text-center">
                <div className="text-sm text-muted-foreground">Eligible For</div>
                <div className="text-2xl font-bold text-primary">
                  {eligible.length}/{companies.length}
                </div>
                <div className="text-xs text-muted-foreground">companies</div>
              </div>
            </div>
          </div>
        </Card>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search companies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="h-10 px-3 rounded-md border border-input bg-background text-sm"
            >
              <option value="all">All Categories</option>
              <option value="product">Product-Based</option>
              <option value="service">Service-Based</option>
              <option value="startup">Startup</option>
              <option value="consulting">Consulting</option>
              <option value="mnc">MNC/Finance</option>
            </select>
          </div>
        </div>

        {/* Results Tabs */}
        <Tabs defaultValue="eligible" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2 mb-6">
            <TabsTrigger value="eligible" className="gap-2">
              <CheckCircle2 className="h-4 w-4" />
              Eligible ({filteredEligible.length})
            </TabsTrigger>
            <TabsTrigger value="not-eligible" className="gap-2">
              <XCircle className="h-4 w-4" />
              Not Eligible ({filteredNotEligible.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="eligible">
            {filteredEligible.length === 0 ? (
              <Card className="p-8 text-center">
                <p className="text-muted-foreground">
                  {cgpaValue === 0
                    ? 'Enter your CGPA to see eligible companies'
                    : 'No companies match your criteria'}
                </p>
              </Card>
            ) : (
              <div>{renderCategorySection(eligibleByCategory, true)}</div>
            )}
          </TabsContent>

          <TabsContent value="not-eligible">
            {filteredNotEligible.length === 0 ? (
              <Card className="p-8 text-center">
                <p className="text-muted-foreground">
                  Great! You're eligible for all companies matching your filters.
                </p>
              </Card>
            ) : (
              <div>{renderCategorySection(notEligibleByCategory, false)}</div>
            )}
          </TabsContent>
        </Tabs>

        {/* Disclaimer */}
        <Card className="mt-8 p-4 bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800">
          <p className="text-sm text-amber-800 dark:text-amber-200">
            <strong>Disclaimer:</strong> Eligibility criteria may vary by year, campus, and specific role. 
            This data is compiled from various sources and should be used as a general reference only. 
            Always verify with official company announcements and your placement cell.
          </p>
        </Card>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 border-t border-border">
        <div className="text-center text-sm text-muted-foreground">
          <p className="font-semibold text-foreground mb-1">
            Created by: Ankush Shaw & Ashish Chaurasia
          </p>
          <p>Narula Institute of Technology — CSE 1D</p>
        </div>
      </footer>
    </div>
  );
}
