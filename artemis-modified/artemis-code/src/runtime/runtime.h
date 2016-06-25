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

#ifndef RUNTIME_H_
#define RUNTIME_H_

#include <QObject>
#include <QUrl>
#include <QNetworkProxy>
#include <set>

#include "strategies/inputgenerator/inputgeneratorstrategy.h"
#include "strategies/inputgenerator/targets/targetgenerator.h"
#include "strategies/termination/terminationstrategy.h"
#include "strategies/prioritizer/prioritizerstrategy.h"

#include "runtime/options.h"
#include "runtime/worklist/worklist.h"
#include "runtime/browser/webkitexecutor.h"
#include "runtime/browser/executionresult.h"
#include "runtime/browser/cookies/immutablecookiejar.h"
#include "runtime/executableconfiguration.h"
#include "runtime/appmodel.h"

namespace artemis
{

class Runtime : public QObject
{
    Q_OBJECT

public:
    Runtime(QObject* parent, const Options& options, QUrl url);
    ~Runtime() {}
    std::string dependencyString;
    void startAnalysis(QUrl startAnalysis);

private:
    void preConcreteExecution();

    // MODIFIED by CH
    void readDependencyList();

    void finishAnalysis();

    AppModelPtr mAppmodel;
    WebKitExecutor* mWebkitExecutor;
    WorkListPtr mWorklist;
    set<long>* mVisitedStates;

    TerminationStrategy* mTerminationStrategy;
    PrioritizerStrategyPtr mPrioritizerStrategy;
    InputGeneratorStrategy* mInputgenerator;

    Options mOptions;

private slots:
    void postConcreteExecution(ExecutableConfigurationConstPtr configuration, QSharedPointer<ExecutionResult> result);
    void slAbortedExecution(QString reason);

signals:
    void sigTestingDone();

};

} /* namespace artemis */

#endif /* RUNTIME_H_ */
