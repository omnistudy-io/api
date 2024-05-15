import { query } from "../db";
import { UserStudySetSchema, UserStudySetQuestionSchema } from "../schema";
import StudySetQuestionsModel from "./StudySetQuestions";

export default class StudySetsModel {
    /**
     * Get a study set by its ID
     * 
     * @param id The study set ID
     * @returns 
     */
    static async getById(id: number): Promise<{
        code: number,
        message: string,
        studySet: any | null
    }> {
        const sql = `SELECT * FROM user_study_sets WHERE id=${id}`;
        let res = await query(sql);
        if(res.result == null)
            return { code: 500, message: res.message, studySet: null };
        if(res.result.length == 0) 
            return { code: 404, message: 'Study set not found', studySet: null };

        const studySet: UserStudySetSchema = res.result[0];
        const questionRes = await StudySetQuestionsModel.getByStudySetId(studySet.id);

        return { code: 200, message: 'Study set found', studySet: { ...studySet, questions: questionRes.questions }};
    }

    /**
     * Get all study sets for a given user ID
     * 
     * @param userId The user ID
     * @returns 
     */
    static async getByUserId(userId: number): Promise<{
        code: number,
        message: string,
        studySets: UserStudySetSchema[]
    }> {
        const sql = `SELECT * FROM user_study_sets WHERE user_id=${userId}`;
        let res = await query(sql);
        if(res.result == null)
            return { code: 500, message: res.message, studySets: [] };
        if(res.result.length == 0) 
            return { code: 404, message: 'No study sets found', studySets: [] };
        return { code: 200, message: 'Study sets found', studySets: res.result };
    }

    /**
     * Create a new study set
     * 
     * @param ss The study set
     * @param ssq The study set questions array
     */
    static async create(ss: any, ssq: UserStudySetQuestionSchema[]): Promise<{
        code: number,
        message: string,
        studySet: any
    }> {
        const sql = `INSERT INTO user_study_sets (
            user_id, title, description, num_questions, created_at
        ) VALUES (
            ${ss.user_id}, '${ss.title}', '${ss.description}', ${ssq.length}, NOW()
        )`;
        let res = await query(sql);
        if(res.result == null)
            return { code: 500, message: res.message, studySet: null };

        const studySetId = res.result.insertId;
        ssq.forEach(async (q: UserStudySetQuestionSchema) => {
            const sql = `INSERT INTO user_study_set_questions (
                study_set_id, type, question, answer, options
            ) VALUES (
                ${studySetId}, '${q.type}', '${q.question}', '${q.answer}', ${q.options ? `'${JSON.stringify(q.options)}'` : `NULL`}
            )`;
            console.log(sql);
            const qRes = await query(sql);
            console.log(qRes);
            if(qRes.result == null)
                return { code: 500, message: qRes.message, studySet: null };
        });

        return { code: 200, message: 'Study set created', studySet: { ...ss, id: studySetId, questions: ssq }};
    }

    /**
     * Delete a study set by its ID
     * 
     * @param id The study set ID
     */
    static async delete(id: number): Promise<{
        code: number,
        message: string,
        studySet: UserStudySetSchema | null
    }> {
        // Get the study set
        const getSql = `SELECT * FROM user_study_sets WHERE id=${id}`;
        let getRes = await query(getSql);
        // Query/connection error
        if(getRes.result == null)
            return { code: 500, message: getRes.message, studySet: null };
        // Study set not found
        if(getRes.result.length == 0)
            return { code: 404, message: 'Study set not found', studySet: null };
        // Study set found
        const studySet: UserStudySetSchema = getRes.result[0];
    
        // Delete the study set
        const sql = `DELETE FROM user_study_sets WHERE id=${id}`;
        let res = await query(sql);
        // Query/connection error
        if(res.result == null)
            return { code: 500, message: res.message, studySet: null };
        // Successful delete
        return { code: 200, message: 'Study set deleted', studySet: studySet };
    }
}