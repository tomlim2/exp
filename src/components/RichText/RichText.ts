export type TextType = string | "plain" | "hashTag" | "mention" | "url";

export interface TextItemDetail {
    text: string;
    type: TextType;
    length: number;
    startIndexInSentence: number;
    endIndexInSenctence: number;
    startIndexInAllText: number;
    endIndexInAllText: number;
    url: string;
}

export type TextItemDetails = TextItemDetail[]
export type TextItemDetailsList = TextItemDetails[]

interface ConvertToTagDetails {
    tagDetailsList: TextItemDetailsList
    tagDetails: TextItemDetails
}

const patterns = {
    url: /[(http(s)?):(www)?a-zA-Z0-9@:%._~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_.~#?&//=]*)/gi,
    checkProtocal: /^((http|https|ftp):\/\/)/,
    hashTag: /\B#[^\s#]+/gi,
    mention: /\B@[^\s@]+/gi,
};

const convertToTagDetails = (text: string, mentionList: any = null): ConvertToTagDetails => {
    const textArrayByLineBreak: string[] = text.split("\n");
    const tagDetailsList: TextItemDetailsList = [];
    let tagDetails: TextItemDetails = []
    let prevTextLength: number = 0;

    for (let textArrayIndex = 0; textArrayIndex < textArrayByLineBreak.length; textArrayIndex++) {
        const currentRowText = textArrayByLineBreak[textArrayIndex];
        const tagDetailRow = formatTagDetailRow(currentRowText, prevTextLength, mentionList)

        tagDetailsList[textArrayIndex] = tagDetailRow
        tagDetails = [...tagDetails, ...tagDetailRow];
        prevTextLength = prevTextLength + textArrayByLineBreak[textArrayIndex].length + 1;
    }

    const convertedTags = { tagDetailsList, tagDetails }

    return convertedTags;
};

const formatTagDetailRow = (text: string, prevTextLength: number, mentionList: any = null): TextItemDetails => {
    let linkDetailsInRow: TextItemDetails = [];

    const urlsListInRow: TextItemDetails = [];
    const hashTagListInRow: TextItemDetails = [];
    const mentionListInRow: TextItemDetails = [];

    const matchedUrlsInRow = String(text).match(patterns.url);
    const matchedHashTagsInRow = String(text).match(patterns.hashTag);
    const matchedMentionInRow = String(text).match(patterns.mention);

    if (matchedUrlsInRow || matchedHashTagsInRow || matchedMentionInRow) {
        if (matchedUrlsInRow) {
            let beforeIndex = 0;

            for (let urlIndex = 0; urlIndex < matchedUrlsInRow.length; urlIndex++) {
                const currentUrl = matchedUrlsInRow[urlIndex];
                const indexOfUrl = text.indexOf(
                    currentUrl,
                    beforeIndex
                );

                let linkUrl;

                if (!patterns.checkProtocal.test(currentUrl)) {
                    linkUrl = "http://" + currentUrl;
                } else {
                    linkUrl = currentUrl;
                }

                const currentUrlDetail = formatDetail("url", currentUrl, indexOfUrl, prevTextLength, linkUrl)

                urlsListInRow.push(currentUrlDetail);
                beforeIndex = indexOfUrl + currentUrl.length;
            }
        }

        if (matchedHashTagsInRow) {
            let beforeIndex = 0;

            for (let hashTagIndex = 0; hashTagIndex < matchedHashTagsInRow.length; hashTagIndex++) {
                const currentHashTag = matchedHashTagsInRow[hashTagIndex];
                const indexOfHashTag = text.indexOf(
                    matchedHashTagsInRow[hashTagIndex],
                    beforeIndex
                );

                // currentUrl
                const linkUrl = "/" + currentHashTag.slice(1, currentHashTag.length);

                const currentHashTagDetail = formatDetail('hashTag', currentHashTag, indexOfHashTag, prevTextLength, linkUrl)

                hashTagListInRow.push(currentHashTagDetail);
                beforeIndex = indexOfHashTag + currentHashTag.length;
            }
        }

        if (matchedMentionInRow) {
            let beforeIndex = 0;

            for (let mentionIndex = 0; mentionIndex < matchedMentionInRow.length; mentionIndex++) {
                const currentMention = matchedMentionInRow[mentionIndex];
                const indexOfMention = text.indexOf(
                    matchedMentionInRow[mentionIndex],
                    beforeIndex
                );

                let currentMentionUserId: number | undefined

                if (mentionList) {
                    mentionList.forEach((mention: any) => {
                        if ("@" + mention.nickname === currentMention) {
                            currentMentionUserId = mention.userId
                        }
                    })
                }

                // currentUrl
                const linkUrl = currentMentionUserId ? "/" + String(currentMentionUserId) : '';

                const currentMentionDetail = formatDetail('mention', currentMention, indexOfMention, prevTextLength, linkUrl)

                mentionListInRow.push(currentMentionDetail);
                beforeIndex = indexOfMention + currentMention.length;
            }
        }

        const processedList = processDetailsInRow([...urlsListInRow, ...hashTagListInRow, ...mentionListInRow], text, prevTextLength);
        linkDetailsInRow = [...processedList];

    } else {
        const plainTextDetail = formatDetail("plain", text, 0, prevTextLength)
        linkDetailsInRow.push(plainTextDetail);
    }

    return linkDetailsInRow
}

const formatDetail = (id: string, text: string, indexOfText: number, prevTextLength: number, url: string = "") => {
    const detail = {
        text: text,
        type: id,
        length: text.length,
        startIndexInSentence: indexOfText,
        endIndexInSenctence: indexOfText + text.length,
        startIndexInAllText: prevTextLength + indexOfText,
        endIndexInAllText: prevTextLength + indexOfText + text.length,
        url: url,
    };

    return detail
}

const processDetailsInRow = (linkList: TextItemDetails, allText: string, prevTextLength: number): TextItemDetails => {
    const sortedList = linkList.sort((a, b) => {
        return a.startIndexInSentence - b.startIndexInSentence;
    });

    const processedTexts: TextItemDetails = [];
    let beforeIndex = 0;

    for (let i = 0; i < sortedList.length; i++) {
        const sortedItem = sortedList[i];
        const startIndexInSentence = sortedItem.startIndexInSentence;

        if (startIndexInSentence > 0) {
            const text = allText.slice(beforeIndex, startIndexInSentence);
            const sortedTextDetails = formatDetail("plain", text, beforeIndex, prevTextLength)

            processedTexts.push(sortedTextDetails);
        }

        processedTexts.push(sortedList[i]);
        beforeIndex = sortedList[i].endIndexInSenctence;
    }

    if (beforeIndex < allText.length) {
        const leftText = allText.slice(beforeIndex, allText.length);
        const leftTextDetails = formatDetail("plain", leftText, beforeIndex, prevTextLength)

        processedTexts.push(leftTextDetails);
    }

    return processedTexts;
};

export const linkDetails = (text: string, mentionList: any = null): TextItemDetails => {
    return convertToTagDetails(text, mentionList).tagDetails;
}

export const linkDetailsList = (text: string, mentionList: any = null): TextItemDetailsList => {
    return convertToTagDetails(text, mentionList).tagDetailsList;
}


export const searchHashTag = (text: string, result: any): any => {
    return { tags: result.filter((tag: any) => tag.tag.startsWith(text)) }
}

export const searchMention = (text: string, result: any): any => {
    return { mentions: result.filter((mention: any) => mention.nickname.startsWith(text)) }
} 