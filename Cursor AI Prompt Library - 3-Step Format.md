Cursor AI Prompt Library - 3-Step
# Cursor AI Prompt Library - 3-Step Framework

## Overview

This library provides structured prompts for Cursor AI to ensure consistent, high-quality outputs. The framework follows a proven 3-step approach that significantly improves AI collaboration outcomes.

---

## 🎯 The 3-Step Framework

### **Step 1: Problem Statement & Planning Request**

Define the problem, use case, expected output, guardrails, and request a step-by-step plan for verification.

### **Step 2: Manual Plan Verification**

Review and approve (or modify) the AI's proposed plan before execution.

### **Step 3: Execution Prompt**

Instruct the AI to proceed with the verified plan from Step 1.

---

## 📚 Prompt Templates

### Template 1: Feature Development

#### **STEP 1 - Planning Prompt**

```
**PROBLEM STATEMENT:**
I need to build [feature name] that [describe what it does].

**USE CASE:**
- Users will [describe user interaction]
- This feature should support [list requirements]
- Expected user journey: [describe flow]

**EXPECTED OUTPUT:**
- [Specify deliverables: components, functions, files, etc.]
- Code quality: production-ready, type-safe, tested
- Documentation: inline comments and README updates

**GUARDRAILS & CONSTRAINTS:**
- Use [framework/library versions]
- Follow [design patterns/architecture]
- Must maintain compatibility with [existing systems]
- Performance requirements: [specify if any]
- DO NOT modify: [list protected files/modules]
- Must include: error handling, loading states, validation

**TECHNICAL CONTEXT:**
@[relevant files/folders]
@docs [if applicable]

**API DOCUMENTATION:**
[Attach or reference API docs if needed]

**INSTRUCTION:**
Before writing any code, provide a detailed step-by-step implementation plan. Include:
1. Files to create/modify
2. Key functions/components to implement
3. Dependencies to install
4. Testing strategy
5. Potential edge cases to handle

Wait for my approval before proceeding.
```

#### **STEP 2 - Verification**

```
[Review the AI's plan and respond with one of:]

✅ "Plan approved. Proceed with implementation."

⚠️ "Plan needs modification: [specify changes]"

❌ "Let's reconsider the approach: [provide alternative direction]"
```

#### **STEP 3 - Execution Prompt**

```
Proceed with the approved plan from Step 1.

**EXECUTION REQUIREMENTS:**
- Write tests first, then implementation code
- Run tests and iterate until all tests pass
- Use YOLO mode for automated testing
- Keep me updated on progress but don't ask for approval at each step
- If you encounter errors, attempt to fix them autonomously (up to 3 iterations)
- Create clean, production-ready code with proper error handling
- Update relevant documentation

Begin implementation now.
```

---

### Template 2: Bug Fix / Debugging

#### **STEP 1 - Planning Prompt**

```
**PROBLEM STATEMENT:**
I'm experiencing [describe bug/issue] when [describe trigger conditions].

**USE CASE:**
- Current behavior: [what's happening]
- Expected behavior: [what should happen]
- Steps to reproduce:
  1. [step 1]
  2. [step 2]
  3. [result]

**EXPECTED OUTPUT:**
- Root cause analysis
- Fixed code
- Test cases to prevent regression
- Documentation of the fix

**GUARDRAILS & CONSTRAINTS:**
- Minimize changes to existing code structure
- Maintain backward compatibility
- DO NOT refactor unrelated code
- Must include tests that reproduce the bug and verify the fix

**TECHNICAL CONTEXT:**
@[files where bug occurs]
@[related files]
Error logs: [paste error messages if any]

**INSTRUCTION:**
Before fixing, provide:
1. Diagnosis of the root cause
2. Proposed solution approach
3. Files that need modification
4. Testing strategy to verify the fix
5. Any potential side effects

Wait for my approval before proceeding.
```

#### **STEP 2 - Verification**

```
[Review diagnosis and proposed solution]

✅ "Diagnosis confirmed. Proceed with the fix."

⚠️ "Alternative approach needed: [specify]"

❌ "Root cause is different: [explain]"
```

#### **STEP 3 - Execution Prompt**

```
Proceed with the approved fix.

**EXECUTION REQUIREMENTS:**
- Write a failing test that reproduces the bug first
- Implement the fix
- Verify the test now passes
- Run full test suite to check for regressions
- Add inline comments explaining the fix
- Update documentation if behavior changed

Begin implementation now.
```

---

### Template 3: Code Refactoring

#### **STEP 1 - Planning Prompt**

```
**PROBLEM STATEMENT:**
The code in @[file/folder] needs refactoring to [improve performance/readability/maintainability].

**USE CASE:**
- Current issues:
  - [list problems with current implementation]
- Goals of refactoring:
  - [list improvement objectives]
- Must preserve all existing functionality

**EXPECTED OUTPUT:**
- Refactored code maintaining 100% functional parity
- Improved [performance/structure/readability]
- Updated tests
- Migration guide if breaking changes

**GUARDRAILS & CONSTRAINTS:**
- CRITICAL: All existing tests must pass
- DO NOT change external API/interface unless specified
- Maintain current dependencies unless upgrade is necessary
- Follow project's [architectural pattern]
- Code style: [specify style guide]

**TECHNICAL CONTEXT:**
@[files to refactor]
@[test files]
Current test coverage: [percentage if known]

**INSTRUCTION:**
Before refactoring, provide:
1. Analysis of current code issues
2. Proposed refactoring strategy
3. List of files to be modified
4. Risk assessment (potential breaking changes)
5. Testing approach to ensure no regressions

Wait for my approval before proceeding.
```

#### **STEP 2 - Verification**

```
[Review refactoring strategy]

✅ "Strategy approved. Proceed carefully."

⚠️ "Adjust approach: [specify changes]"

❌ "Let's take a different direction: [explain]"
```

#### **STEP 3 - Execution Prompt**

```
Proceed with the approved refactoring plan.

**EXECUTION REQUIREMENTS:**
- Run all existing tests first to establish baseline
- Make incremental changes, testing after each major change
- If any test fails, revert and try alternative approach
- Add new tests for any new code paths
- Ensure all tests pass before considering complete
- Document significant changes in code comments

Begin refactoring now.
```

---

### Template 4: New Component/Module Creation

#### **STEP 1 - Planning Prompt**

```
**PROBLEM STATEMENT:**
Create a new [component/module/service] named [name] that [describe purpose].

**USE CASE:**
- This [component/module] will be used to [describe usage]
- It should integrate with [existing systems]
- Key features required:
  1. [feature 1]
  2. [feature 2]
  3. [feature 3]

**EXPECTED OUTPUT:**
- Main [component/module] file(s)
- Associated types/interfaces
- Unit tests (>80% coverage)
- Integration tests if applicable
- Usage documentation/examples
- Storybook stories (if UI component)

**GUARDRAILS & CONSTRAINTS:**
- Must follow [design system/pattern library]
- Use [styling approach: Tailwind/CSS modules/etc.]
- Props/API should be [describe interface requirements]
- Accessibility: WCAG 2.1 AA compliant (if UI)
- Must be tree-shakeable/modular
- NO external dependencies unless approved

**TECHNICAL CONTEXT:**
@[similar existing components for reference]
@[design system/component library]
@[type definitions]

**API DOCUMENTATION:**
[Reference API docs or design specs]

**INSTRUCTION:**
Before creating, provide:
1. File structure and naming convention
2. Component/module API design (props, methods, exports)
3. Key implementation details
4. Testing approach
5. Dependencies (if any) with justification

Wait for my approval before proceeding.
```

#### **STEP 2 - Verification**

```
[Review proposed structure and API]

✅ "Design approved. Proceed with creation."

⚠️ "Modify API design: [specify changes]"

❌ "Reconsider approach: [provide feedback]"
```

#### **STEP 3 - Execution Prompt**

```
Proceed with creating the [component/module] as planned.

**EXECUTION REQUIREMENTS:**
- Create tests first (TDD approach)
- Implement the component/module
- Ensure all tests pass
- Add comprehensive JSDoc/TSDoc comments
- Create usage examples in README or stories
- If UI component: ensure responsive, accessible, and follows design system
- Run linter and fix all issues

Begin implementation now.
```

---

### Template 5: API Integration

#### **STEP 1 - Planning Prompt**

```
**PROBLEM STATEMENT:**
Integrate [API name] into the application to [describe purpose].

**USE CASE:**
- API should be called when [trigger condition]
- Data flow: [describe data flow]
- Handle scenarios:
  - Success case: [expected behavior]
  - Error case: [error handling]
  - Loading state: [loading behavior]
  - Retry logic: [if applicable]

**EXPECTED OUTPUT:**
- API client/service module
- Type definitions for requests/responses
- Error handling utilities
- Loading state management
- Unit tests with mocked responses
- Integration tests (if applicable)

**GUARDRAILS & CONSTRAINTS:**
- Use [HTTP client: axios/fetch/etc.]
- API Base URL: [specify or use environment variable]
- Authentication: [describe auth method]
- Rate limiting: [specify limits]
- Timeout: [specify timeout settings]
- Error codes to handle: [list expected error codes]
- DO NOT expose sensitive credentials in code

**TECHNICAL CONTEXT:**
@[existing API services for reference]
@[authentication utilities]

**API DOCUMENTATION:**
[Attach/link API documentation]
Required endpoints:
- [Endpoint 1]: [description]
- [Endpoint 2]: [description]

**INSTRUCTION:**
Before implementing, provide:
1. API service architecture
2. Type definitions for all endpoints
3. Error handling strategy
4. Testing approach (with mock data)
5. Security considerations

Wait for my approval before proceeding.
```

#### **STEP 2 - Verification**

```
[Review integration architecture]

✅ "Architecture approved. Proceed with integration."

⚠️ "Adjust error handling: [specify]"

❌ "Different approach needed: [explain]"
```

#### **STEP 3 - Execution Prompt**

```
Proceed with API integration as planned.

**EXECUTION REQUIREMENTS:**
- Create comprehensive type definitions first
- Implement API client with all error scenarios
- Write tests with mocked responses (DO NOT call real API in tests)
- Add retry logic with exponential backoff (if specified)
- Implement proper error logging
- Handle network failures gracefully
- Add request/response interceptors if needed
- Test all edge cases (timeout, network error, 4xx, 5xx)

Begin implementation now.
```

---

## 🎯 Best Practices for All Prompts

### Context Provision

Always include:

- `@file` - Reference specific files
- `@folder` - Reference entire directories
- `@docs` - Reference documentation
- `@web` - Search for current information
- `@Git` - Reference git history/commits

### Prompt Structure

1. **Be specific**: "Create a React component" → "Create a React functional component using TypeScript with proper prop types"
2. **Set boundaries**: Clearly state what NOT to modify
3. **Define success**: Specify what "done" looks like
4. **Provide examples**: Reference similar existing code when possible

### Communication Style

- **Collaborate, don't command**: Treat AI as a pair programmer
- **One task per conversation**: Start new chats for unrelated tasks
- **Verify before proceeding**: Always use the 3-step approach for complex tasks
- **Document learnings**: Save successful prompts for reuse

### Quality Assurance

- **Tests first**: "Write tests first, then the code, then run tests until they pass"
- **Enable YOLO mode**: For automated test execution
- **Limit iterations**: "Fix linter errors, but stop after 3 attempts"
- **Request explanations**: "Explain your approach as if I'm learning"

---

## ⚙️ Cursor Configuration Tips

### .cursorrules File

Create a `.cursorrules` file in your project root:

```markdown
# Project Rules

## Code Style

- Use TypeScript strict mode
- Follow ESLint configuration
- Prefer functional programming patterns
- Use meaningful variable names (no single letters except in loops)

## Testing

- Minimum 80% test coverage
- Write tests before implementation
- Use [testing framework]

## File Organization

- Components in `/components`
- Utilities in `/utils`
- Types in `/types`
- Tests colocated with source files as `*.test.ts`

## Git Workflow

- Write clear commit messages
- One logical change per commit
- Reference issue numbers in commits

## Documentation

- JSDoc for all public functions
- README for each major module
- Update docs with code changes

## AI Collaboration

- Always plan before implementing
- Request approval for significant changes
- Document assumptions in comments
```

### YOLO Mode Setup

```
Settings → Cursor Settings → Beta → YOLO Mode

Prompt: "Any tests are allowed (vitest, npm test, nr test, etc.)"
Allow list: test, spec, check, lint, tsc, mkdir
```

---

## 🚨 Common Pitfalls to Avoid

1. **Vague prompts**: "Make it better" → Specify exactly what "better" means
2. **No guardrails**: Always specify what NOT to change
3. **Skipping verification**: Don't let AI proceed without plan approval
4. **Long conversations**: Start fresh for new tasks to maintain context
5. **No testing strategy**: Always specify how to verify correctness
6. **Accepting first output**: Review and iterate, especially for complex tasks
7. **Ignoring project context**: Always reference existing patterns with `@`

---

## 📊 Quick Reference: When to Use Each Template

| Template            | Use When                     | Complexity  |
| ------------------- | ---------------------------- | ----------- |
| Feature Development | Building new functionality   | High        |
| Bug Fix             | Addressing existing issues   | Medium      |
| Code Refactoring    | Improving existing code      | High        |
| Component Creation  | Creating reusable components | Medium      |
| API Integration     | Connecting external services | Medium-High |

---

## 💡 Pro Tips

1. **Chain of Thought**: Add "Explain your reasoning step-by-step" for complex logic
2. **Few-Shot Learning**: Provide 2-3 examples of desired output format
3. **Incremental Development**: Break large tasks into smaller 3-step cycles
4. **Context Optimization**: Use `@folder` instead of individual files when possible
5. **Model Selection**: Use Claude Sonnet 4.5 for complex reasoning, GPT-4 for speed
6. **Version Control**: Commit before major AI-assisted changes for easy rollback

---

## 📝 Template Usage Example

**Scenario**: Adding authentication to a Next.js app

### Step 1 - Planning

```
**PROBLEM STATEMENT:**
Implement JWT-based authentication in our Next.js 14 app with email/password login.

**USE CASE:**
- Users can register with email/password
- Users can login and receive JWT token
- Protected routes redirect to login if not authenticated
- Token stored in httpOnly cookie

**EXPECTED OUTPUT:**
- Auth API routes (/api/auth/login, /api/auth/register, /api/auth/logout)
- Auth middleware for protected routes
- Login and Register UI components
- Auth context provider
- Type definitions for User and Auth state

**GUARDRAILS & CONSTRAINTS:**
- Use bcrypt for password hashing
- JWT secret from environment variables
- Password requirements: min 8 chars, 1 uppercase, 1 number
- Rate limiting: 5 attempts per 15 minutes
- DO NOT store passwords in plain text
- DO NOT expose JWT secret in client code

**TECHNICAL CONTEXT:**
@app/api
@components/auth
@lib/auth
@types

**INSTRUCTION:**
Provide implementation plan including:
1. File structure
2. Database schema (if needed)
3. API endpoints design
4. Security considerations
5. Testing approach

Wait for approval.
```

### Step 2 - Verification

```
✅ Plan looks good, but add:
- Token refresh mechanism
- Password reset functionality
- Email verification

Proceed with updated plan.
```

### Step 3 - Execution

```
Proceed with auth implementation.

**EXECUTION REQUIREMENTS:**
- Write integration tests for auth flow
- Implement all API routes with proper error handling
- Create UI components with loading/error states
- Add middleware for route protection
- Test with various invalid inputs
- Ensure all tests pass

Begin now.
```

---

## 🔄 Iteration Pattern

If Step 3 output isn't satisfactory:

```
The implementation has [specific issue].

Let's fix this:
1. [Specific change needed]
2. [Another specific change]

Run tests after changes and verify [specific behavior].
```

---

## 📚 Additional Resources

- [Cursor Documentation](https://docs.cursor.com)
- [Anthropic Prompt Engineering Guide](https://docs.anthropic.com/claude/docs/prompt-engineering)
- [Cursor Rules Repository](https://github.com/PatrickJS/awesome-cursorrules)
- [OpenAI GPT-5 Prompting Guide](https://cookbook.openai.com)

---

## Version History

- **v1.0** (2025-10-29): Initial framework based on proven 3-step methodology
- Focus: Consistency, quality, and systematic AI collaboration

---

**Remember**: The 3-step framework ensures you're always in control while maximizing AI effectiveness. Plan, Verify, Execute.
