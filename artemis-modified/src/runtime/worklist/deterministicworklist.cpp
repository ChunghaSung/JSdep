/*
 * Copyright 2012 Aarhus University
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

#include <stdlib.h>
#include <unistd.h>
#include <sys/time.h>
#include "deterministicworklist.h"

extern int testType;
extern int totalTry;
extern int blockedCnt;
extern int blockedCnt2;
extern double totaltime1;
extern double totaltime2;

namespace artemis
{

DeterministicWorkList::DeterministicWorkList(PrioritizerStrategyPtr prioritizer) :
    WorkList(),
    mPrioritizer(prioritizer)
{
}
// MODIFIED by CH
void DeterministicWorkList::add(ExecutableConfigurationConstPtr configuration, AppModelConstPtr appmodel, string dependencyString)
{
    struct timeval curT1_1;
    struct timeval curT1_2;
    struct timeval curT2_1;
    struct timeval curT2_2;
    double all;
    double minus = 0;
    gettimeofday(&curT1_1, NULL);
    totalTry ++;
    if (testType == 1) {
        // Just check very last two sequence and judge whether it will be added or not
        string addingWorklist = configuration-> getSequence().toStdString();
        istringstream ss(addingWorklist);
        string token;
        vector<string> eventSequence;
        while (getline(ss, token, ',')) {
            eventSequence.push_back(token);
        }
        int size = eventSequence.size();

        if (size>1) {
            // Last sequence of Dom1 & Dom2
            string dom1 = eventSequence[size-2];
            string dom2 = eventSequence[size-1];
            vector <string> reachableSet = reachableMap[dom1];
            //cout << dom1 << "\n";
            //cout << dom2 << "\n";
            /*
            for (std::vector<string>::const_iterator i = reachableSet.begin(); i != reachableSet.end(); ++i)
                std::cout << *i << ' ';
                */

            if (std::find(reachableSet.begin(), reachableSet.end(), dom2) != reachableSet.end()) {
                gettimeofday(&curT2_1, NULL);
                mQueue.push(WorkListItem(mPrioritizer->prioritize(configuration, appmodel), configuration));
                gettimeofday(&curT2_2, NULL);
                minus= (curT2_2.tv_sec - curT2_1.tv_sec) * 1000.0f + (curT2_2.tv_usec - curT2_1.tv_usec) / 1000.0f;
            } else {
                blockedCnt++;
                vector <string> reachableSet2 = reachableMap[dom2];
                // if there is not dependent relationship and if that is the lexical order then insert it.
                if (dom2.compare(dom1) > 0 && std::find(reachableSet2.begin(), reachableSet2.end(), dom1) == reachableSet2.end()) {
                    gettimeofday(&curT2_1, NULL);
                    mQueue.push(WorkListItem(mPrioritizer->prioritize(configuration, appmodel), configuration));
                    gettimeofday(&curT2_2, NULL);
                    minus= (curT2_2.tv_sec - curT2_1.tv_sec) * 1000.0f + (curT2_2.tv_usec - curT2_1.tv_usec) / 1000.0f;
                } else {
                    blockedCnt2++;
                }

            }
        } else {
            string addingWorklist = configuration-> getSequence().toStdString();
            gettimeofday(&curT2_1, NULL);
            mQueue.push(WorkListItem(mPrioritizer->prioritize(configuration, appmodel), configuration));
            gettimeofday(&curT2_2, NULL);
            minus= (curT2_2.tv_sec - curT2_1.tv_sec) * 1000.0f + (curT2_2.tv_usec - curT2_1.tv_usec) / 1000.0f;
        }
    } else {
        gettimeofday(&curT2_1, NULL);
        mQueue.push(WorkListItem(mPrioritizer->prioritize(configuration, appmodel), configuration));
        gettimeofday(&curT2_2, NULL);
        minus= (curT2_2.tv_sec - curT2_1.tv_sec) * 1000.0f + (curT2_2.tv_usec - curT2_1.tv_usec) / 1000.0f;
    }
    gettimeofday(&curT1_2, NULL);
    all = (curT1_2.tv_sec - curT1_1.tv_sec) * 1000.0f + (curT1_2.tv_usec - curT1_1.tv_usec) / 1000.0f;
    totaltime1 = totaltime1 + all - minus;
    totaltime2 = totaltime2 + all;

}

ExecutableConfigurationConstPtr DeterministicWorkList::remove()
{
    Q_ASSERT(!mQueue.empty());

    ExecutableConfigurationConstPtr configuration = mQueue.top().second;
    mQueue.pop();

    return configuration;
}

void DeterministicWorkList::reprioritize(AppModelConstPtr appmodel)
{
    QList<WorkListItem> tmps;

    while (!mQueue.empty()) {
        tmps.append(mQueue.top());
        mQueue.pop();
    }

    foreach (WorkListItem item, tmps) {
        item.first = mPrioritizer->prioritize(item.second, appmodel);
        mQueue.push(item);
    }
}

int DeterministicWorkList::size()
{
    return mQueue.size();
}

bool DeterministicWorkList::empty()
{
    return mQueue.empty();
}

// MODIFIED by CH
void DeterministicWorkList::readFile(QUrl url)
{
    string line;
    /*
    TODO: I have to set directory path based on url
    cout << "readfile!\n";
    cout << url.toString().toStdString(); 
    cout << "\n";
    */
    // get file Path of dep.txt 
    char *path = NULL;
    size_t size= 200;
    path = getcwd(path,size);
    char filePath[200];
    cout << path << "\n";
    strcpy(filePath, path);
    strcat(filePath, "/dep.txt");
    unsigned int cnt = 0;
    // open file and saving data
    ifstream myfile(filePath);
    string dom1, event1, dom2, event2;
    string parent, child;
    if (myfile.is_open()) {
        while (getline(myfile,line)) {
            istringstream base(line);
            string index;
            if (cnt == 0) {
                dom1 = line;
            } else if (cnt == 1) {
                event1 = line;
            } else if (cnt == 2) {
                dom2 = line;
            } else if (cnt == 3) {
                event2 = line;
            }
            cnt ++;
            if (cnt == 4) {
                cnt = 0;
                if (event1.compare("timerinput") == 0) {
                    parent = event1; 
                } else {
                    parent = event1 + "@" + dom1;
                }
                if (event2.compare("timerinput") == 0) {
                    child = event2; 
                } else {
                    child = event2 + "@" + dom2;
                }
                //cout << parent + ", " + child + "\n";
                reachableMap[parent].push_back(child);
            }
        }
        myfile.close();
    } else {
        cout << "Unable to open file\n"; 
    } 
    cout << "Read done!!!\n";
}

QString DeterministicWorkList::toString() const
{
    // We can't iterate over a priority_queue, thus the ugliness here
    // TODO find a priority_queue implementation supporting iteration

    QList<WorkListItem> tmps;

    while (!mQueue.empty()) {
        tmps.append(mQueue.top());
        mQueue.pop();
    }

    QString output;

    foreach (WorkListItem item, tmps) {
        mQueue.push(item);
        output += QString::number(item.first) + QString(" => ") + item.second->toString() + QString("\n");
    }

    return output;
}

}
