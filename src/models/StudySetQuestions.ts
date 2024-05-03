import { query } from "../db";
import { UserStudySetQuestionSchema } from "../schema";

export default class StudySetQuestionsModel {

    /**
     * Get a study set question by its ID
     * 
     * @param id The study set question ID
     * @returns UserStudySetQuestionSchema | null
     */
    static async getById(id: number): Promise<{
        code: number,
        message: string,
        question: UserStudySetQuestionSchema | null
    }> {
        const sql = `SELECT * FROM user_study_set_questions WHERE id=${id}`;
        let res = await query(sql);
        if(res.result == null)
            return { code: 500, message: res.message, question: null };
        if(res.result.length == 0) 
            return { code: 404, message: 'Study set question not found', question: null };
        return { code: 200, message: 'Study set question found', question: res.result[0] };
    }

    /**
     * Get all study set questions for a given study set ID
     * 
     * @param studySetId The study set ID
     * @returns UserStudySetQuestionSchema[]
     */
    static async getByStudySetId(studySetId: number): Promise<{
        code: number,
        message: string,
        questions: UserStudySetQuestionSchema[]
    }> {
        const sql = `SELECT * FROM user_study_set_questions WHERE study_set_id=${studySetId}`;
        let res = await query(sql);
        if(res.result == null)
            return { code: 500, message: res.message, questions: [] };
        if(res.result.length == 0) 
            return { code: 404, message: 'No study set questions found', questions: [] };
        return { code: 200, message: 'Study set questions found', questions: res.result };
    }

}