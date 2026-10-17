// Fake credentials for isolated tests. Never load production enrollment secrets in tests.
process.env.PPCHS_STUDENT_JOIN_PASSWORD = 'test-high-join';
process.env.AVM_STUDENT_JOIN_PASSWORD = 'test-avm-join';
process.env.WEST_STUDENT_JOIN_PASSWORD = 'test-west-join';
process.env.CENTRAL_STUDENT_JOIN_PASSWORD = 'test-central-join';
process.env.RCSA_STUDENT_JOIN_PASSWORD = 'test-rcsa-join';
process.env.RCSA_INSTRUCTOR_INVITE_PASSWORD = 'test-rcsa-invite';
process.env.SIHS_STUDENT_JOIN_PASSWORD = 'test-sihs-join';
process.env.SIHS_INSTRUCTOR_INVITE_PASSWORD = 'test-sihs-invite';
