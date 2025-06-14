-- Insert sample users
INSERT INTO users (name, email, password_hash) VALUES
('John Doe', 'john@example.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/VcSAg/9qm'),
('Jane Smith', 'jane@example.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/VcSAg/9qm'),
('Bob Johnson', 'bob@example.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/VcSAg/9qm')
ON CONFLICT (email) DO NOTHING;

-- Insert sample chat sessions
INSERT INTO chat_sessions (user_id, title) VALUES
(1, 'Project Planning Discussion'),
(1, 'Technical Support'),
(2, 'Business Strategy Chat'),
(2, 'Code Review Session')
ON CONFLICT DO NOTHING;

-- Insert sample messages
INSERT INTO messages (chat_session_id, role, content) VALUES
(1, 'user', 'How can I improve my project timeline?'),
(1, 'assistant', 'Here are some strategies to improve your project timeline: 1. Break down tasks into smaller, manageable chunks 2. Identify critical path dependencies 3. Use project management tools like Gantt charts 4. Regular check-ins with team members 5. Buffer time for unexpected issues'),
(2, 'user', 'Help me debug this React component'),
(2, 'assistant', 'I''d be happy to help you debug your React component! Please share the code and describe the specific issue you''re encountering. Common issues include: state management problems, prop drilling, useEffect dependencies, or rendering issues.'),
(3, 'user', 'What are the key metrics for a SaaS business?'),
(3, 'assistant', 'Key SaaS metrics include: 1. Monthly Recurring Revenue (MRR) 2. Customer Acquisition Cost (CAC) 3. Customer Lifetime Value (CLV) 4. Churn Rate 5. Net Revenue Retention 6. Annual Recurring Revenue (ARR) 7. Gross Revenue Retention 8. Time to Value 9. Product-Market Fit Score 10. Daily/Monthly Active Users')
ON CONFLICT DO NOTHING;
